import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Commitment = {
  id: string;
  amount_pence: number;
  currency: string;
  status: string;
};

interface DealCommitButtonProps {
  dealSlug: string;
  dealName: string;
  dealStatus?: string | null;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
  fullWidth?: boolean;
}

const isLiveStatus = (status?: string | null) =>
  (status ?? "").trim().toLowerCase() === "live";

const formatGBP = (pence: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pence / 100);

const DealCommitButton: React.FC<DealCommitButtonProps> = ({
  dealSlug,
  dealName,
  dealStatus,
  size = "sm",
  variant = "default",
  className,
  fullWidth,
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existing, setExisting] = useState<Commitment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("deal_commitments")
        .select("id, amount_pence, currency, status")
        .eq("user_id", user.id)
        .eq("deal_slug", dealSlug)
        .maybeSingle();
      setExisting(data as Commitment | null);
      setLoading(false);
    };
    load();
  }, [user?.id, dealSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !user?.email) {
      toast.error("Please sign in first");
      return;
    }
    const numeric = parseFloat(amount.replace(/[, ]/g, ""));
    if (!Number.isFinite(numeric) || numeric <= 0) {
      toast.error("Enter a valid amount in £");
      return;
    }
    if (numeric > 10_000_000) {
      toast.error("Amount is too large");
      return;
    }
    const pence = Math.round(numeric * 100);
    setSubmitting(true);
    const { data, error } = await supabase
      .from("deal_commitments")
      .insert({
        user_id: user.id,
        email: user.email.toLowerCase(),
        deal_slug: dealSlug,
        amount_pence: pence,
        currency: "GBP",
        status: "pending",
      })
      .select("id, amount_pence, currency, status")
      .maybeSingle();
    setSubmitting(false);

    if (error) {
      console.error("Commitment error", error);
      toast.error("Could not submit commitment", { description: error.message });
      return;
    }
    setExisting(data as Commitment);
    toast.success(`Commitment of ${formatGBP(pence)} submitted`, {
      description: "We'll review it and confirm your allocation shortly.",
    });
    setOpen(false);
    setAmount("");
  };

  if (loading) return null;

  const live = isLiveStatus(dealStatus);

  // Already committed → show status badge regardless of current deal status
  if (existing) {
    const isPending = existing.status === "pending";
    const isConfirmed = existing.status === "confirmed";
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium ${
          isConfirmed
            ? "bg-collektiv-green/10 text-collektiv-green"
            : isPending
            ? "bg-amber-50 text-amber-700"
            : "bg-gray-100 text-gray-600"
        } ${fullWidth ? "w-full justify-center" : ""} ${className ?? ""}`}
        onClick={(e) => e.preventDefault()}
      >
        {isConfirmed ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <Clock className="h-3.5 w-3.5" />
        )}
        <span>
          {formatGBP(existing.amount_pence)} ·{" "}
          {isConfirmed ? "Confirmed" : isPending ? "Pending review" : existing.status}
        </span>
      </div>
    );
  }

  // Only allow new commitments on live deals
  if (!live) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-500 ${
          fullWidth ? "w-full justify-center" : ""
        } ${className ?? ""}`}
      >
        Past deal
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={size}
          variant={variant}
          className={`${fullWidth ? "w-full" : ""} ${
            variant === "default" ? "bg-collektiv-green hover:bg-collektiv-lightgreen" : ""
          } ${className ?? ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          Commit to invest
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Commit to {dealName}</DialogTitle>
          <DialogDescription>
            Indicate the amount you would like to invest. This is a non-binding expression of interest;
            the Collektiv team will review and confirm your allocation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Commitment amount (£)</Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                required
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Minimum tickets typically start at £1,000. Final terms are confirmed by an admin.
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Status: Pending until confirmed
          </Badge>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-collektiv-green hover:bg-collektiv-lightgreen"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit commitment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DealCommitButton;
