import { useEffect } from "react";

const SUPABASE_PROJECT_URL = "https://lectuphndieqxoluyhkv.supabase.co";

const AuthMagic = () => {
  useEffect(() => {
    // Read params from the hash (HashRouter): #/auth/magic?token=...&redirect_to=...
    const hash = window.location.hash || "";
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const token = params.get("token");
    const type = params.get("type") || "magiclink";
    const redirectTo =
      params.get("redirect_to") ||
      `${window.location.origin}/#/setup-account`;

    if (!token) {
      window.location.replace(`${window.location.origin}/#/login`);
      return;
    }

    const verifyUrl = `${SUPABASE_PROJECT_URL}/auth/v1/verify?token=${encodeURIComponent(
      token
    )}&type=${encodeURIComponent(type)}&redirect_to=${encodeURIComponent(
      redirectTo
    )}`;

    window.location.replace(verifyUrl);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-3">
        <div className="h-8 w-8 mx-auto border-2 border-current border-t-transparent rounded-full animate-spin" />
        <p className="text-sm opacity-80">Signing you in…</p>
      </div>
    </div>
  );
};

export default AuthMagic;
