import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";

interface Deal {
  slug: string;
  name: string;
}

interface ParsedRow {
  email: string;
  perDeal: Record<string, number>; // pence
}

// Normalise column header → deal slug. We try exact name match first
// (case-insensitive), then a few well-known aliases.
const ALIASES: Record<string, string> = {
  beimpact: "beimpact",
  "be/impact": "beimpact",
  "be impact": "beimpact",
  antrophic: "anthropic",
  anthropic: "anthropic",
  propane: "propane",
  webel: "webel",
  kalshi: "kalshi",
  loxa: "loxa",
  pandektes: "pandektes",
};

const slugifyHeader = (header: string, deals: Deal[]): string | null => {
  const norm = header.trim().toLowerCase();
  if (!norm) return null;
  const direct = deals.find((d) => d.name.toLowerCase() === norm);
  if (direct) return direct.slug;
  if (ALIASES[norm]) return ALIASES[norm];
  return null;
};

// Parse a £-formatted value to integer pence. Returns null if blank/zero.
const parseAmountToPence = (raw: string): number | null => {
  if (!raw) return null;
  const cleaned = raw.replace(/[£$€,\s"]/g, "").trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 100);
};

// Minimal CSV parser that supports quoted fields with commas.
const parseCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") {
        cur.push(field);
        field = "";
      } else if (ch === "\n") {
        cur.push(field);
        rows.push(cur);
        cur = [];
        field = "";
      } else if (ch === "\r") {
        // ignore
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
};

const AdminInvestmentsImporter = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<{ rows: number; deals: number } | null>(null);

  useEffect(() => {
    const loadDeals = async () => {
      const { data } = await supabase.from("investment_deals").select("slug, name");
      setDeals(data ?? []);
    };
    loadDeals();
  }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const name = file.name.toLowerCase();
      const isExcel = name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".ods");
      let rows: string[][];
      if (isExcel) {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1, blankrows: false, defval: "" });
        rows = aoa.map((r) => r.map((c) => (c == null ? "" : String(c))));
      } else {
        const text = await file.text();
        rows = parseCsv(text);
      }
      if (rows.length < 2) throw new Error("File is empty");

      const header = rows[0];
      // Find email column
      const emailIdx = header.findIndex((h) => h.trim().toLowerCase().startsWith("email"));
      if (emailIdx === -1) throw new Error("No 'Email' column found in header");

      // Map deal columns
      const dealColumns: { idx: number; slug: string }[] = [];
      header.forEach((h, idx) => {
        if (idx === emailIdx) return;
        const slug = slugifyHeader(h, deals);
        if (slug) dealColumns.push({ idx, slug });
      });
      if (dealColumns.length === 0) {
        throw new Error("No deal columns recognised. Headers must match deal names.");
      }

      // Build parsed rows
      const parsed: ParsedRow[] = [];
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const email = (row[emailIdx] ?? "").trim().toLowerCase();
        if (!email || !email.includes("@")) continue;
        const perDeal: Record<string, number> = {};
        for (const col of dealColumns) {
          const pence = parseAmountToPence(row[col.idx] ?? "");
          if (pence !== null) perDeal[col.slug] = pence;
        }
        if (Object.keys(perDeal).length > 0) {
          parsed.push({ email, perDeal });
        }
      }

      if (parsed.length === 0) {
        throw new Error("No member rows with investment amounts found.");
      }

      // Build upsert payload: one row per (email, deal)
      const { data: { user } } = await supabase.auth.getUser();
      const payload = parsed.flatMap((p) =>
        Object.entries(p.perDeal).map(([slug, pence]) => ({
          deal_slug: slug,
          email: p.email,
          amount_pence: pence,
          currency: "GBP",
          imported_by: user?.id ?? null,
        })),
      );

      const { error } = await supabase
        .from("member_investments")
        .upsert(payload, { onConflict: "deal_slug,email" });

      if (error) throw error;

      setStats({ rows: parsed.length, deals: dealColumns.length });
      toast.success(`Imported ${payload.length} investment lines for ${parsed.length} members.`);
    } catch (err) {
      console.error("Import failed", err);
      toast.error(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <Card className="border border-collektiv-green/20">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <FileSpreadsheet className="h-6 w-6 text-collektiv-green shrink-0 mt-0.5" />
          <div>
            <h3 className="font-playfair text-lg font-bold text-collektiv-dark">
              Import members' investments
            </h3>
            <p className="text-sm text-gray-600">
              Upload a CSV or Excel file (.xlsx) — for Google Sheets, use{" "}
              <em>File → Download → Microsoft Excel (.xlsx)</em> or{" "}
              <em>Comma-separated values (.csv)</em>. Members are matched by email
              (case-insensitive). Re-uploading overwrites existing amounts for the same
              member/deal pair.
            </p>
          </div>
        </div>

        <div className="rounded-md bg-gray-50 border border-gray-200 p-3 text-xs text-gray-700">
          <p className="font-semibold mb-1">Expected format</p>
          <p>
            Header row must contain an <code>Email</code> column plus one column per deal whose
            name matches a deal in the catalog (e.g.{" "}
            {deals.map((d) => d.name).join(", ")}). Cells can be blank or formatted like{" "}
            <code>£2,500.00</code>. Only the first sheet/tab is read.
          </p>
        </div>

        <div className="space-y-2">
          <Label>CSV or Excel file</Label>
          <Input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv,.xlsx,.xls,.ods,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            disabled={importing}
            onChange={handleFile}
          />
        </div>

        {importing && (
          <div className="flex items-center text-sm text-gray-600">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…
          </div>
        )}

        {stats && !importing && (
          <div className="text-sm text-collektiv-green">
            ✓ Imported {stats.rows} members across {stats.deals} deals.
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={importing}
        >
          <Upload className="h-4 w-4 mr-2" /> Choose file
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminInvestmentsImporter;
