import React, { useEffect, useState } from "react";
import { Bell, Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  canUsePush,
  requestPushPermission,
  isPushSubscribed,
} from "@/lib/onesignal";
import { useToast } from "@/hooks/use-toast";

const DISMISS_KEY = "ck_install_banner_dismissed_at";
const DISMISS_DAYS = 7;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const isIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

const isStandalone = (): boolean =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as any).standalone === true;

const InstallAndPushBanner: React.FC = () => {
  const { toast } = useToast();
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [iosHelpOpen, setIosHelpOpen] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setPushSupported(canUsePush());

    // Check dismissal
    try {
      const at = localStorage.getItem(DISMISS_KEY);
      if (at) {
        const daysSince = (Date.now() - parseInt(at, 10)) / (1000 * 60 * 60 * 24);
        if (daysSince < DISMISS_DAYS) setDismissed(true);
      }
    } catch {}

    // Listen for installable event
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => setInstalled(true);
    window.addEventListener("appinstalled", onInstalled);

    // Check push status
    isPushSubscribed().then(setPushSubscribed);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setDismissed(true);
  };

  const handleInstall = async () => {
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        setInstallEvent(null);
        setInstalled(true);
      }
    } else if (isIOS()) {
      setIosHelpOpen(true);
    }
  };

  const handleEnablePush = async () => {
    const granted = await requestPushPermission();
    if (granted) {
      setPushSubscribed(true);
      toast({
        title: "Notifications enabled",
        description: "You'll get updates from Collektiv Club.",
      });
    } else {
      toast({
        title: "Notifications not enabled",
        description:
          "You can enable them later from your browser settings.",
        variant: "destructive",
      });
    }
  };

  // Hide entirely if dismissed, or if installed AND already subscribed
  if (dismissed) return null;
  if (installed && pushSubscribed) return null;
  // If push isn't supported AND already installed, nothing useful to show
  if (installed && !pushSupported) return null;

  // Decide what to show
  const showInstall = !installed && (installEvent !== null || isIOS());
  const showPush = installed && pushSupported && !pushSubscribed;

  if (!showInstall && !showPush) return null;

  return (
    <>
      <div className="rounded-2xl bg-gradient-to-br from-collektiv-dark to-collektiv-green/90 text-white p-4 shadow-lg relative">
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="rounded-full bg-white/15 p-2 flex-shrink-0">
            {showInstall ? (
              <Smartphone className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {showInstall ? (
              <>
                <h3 className="font-playfair text-base font-semibold mb-1">
                  Install Collektiv as an app
                </h3>
                <p className="text-xs text-white/85 mb-3">
                  Add to your home screen for one-tap access and push
                  notifications about new investments and events.
                </p>
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="bg-white text-collektiv-dark hover:bg-white/90"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  {isIOS() && !installEvent ? "How to install" : "Install"}
                </Button>
              </>
            ) : (
              <>
                <h3 className="font-playfair text-base font-semibold mb-1">
                  Enable notifications
                </h3>
                <p className="text-xs text-white/85 mb-3">
                  Get notified about new investments, events and member updates.
                </p>
                <Button
                  size="sm"
                  onClick={handleEnablePush}
                  className="bg-white text-collektiv-dark hover:bg-white/90"
                >
                  <Bell className="h-3.5 w-3.5 mr-1.5" />
                  Turn on
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {iosHelpOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
          onClick={() => setIosHelpOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 text-collektiv-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-playfair text-lg font-bold mb-3">
              Install on iPhone
            </h3>
            <ol className="text-sm space-y-2 list-decimal list-inside text-gray-700">
              <li>
                Tap the <strong>Share</strong> button at the bottom of Safari
              </li>
              <li>
                Scroll and tap <strong>Add to Home Screen</strong>
              </li>
              <li>
                Tap <strong>Add</strong> in the top-right corner
              </li>
              <li>
                Open the app from your home screen, then enable notifications
              </li>
            </ol>
            <p className="text-xs text-gray-500 mt-4">
              Notifications on iOS only work after installing to home screen
              (iOS 16.4+).
            </p>
            <Button
              className="w-full mt-4 bg-collektiv-green hover:bg-collektiv-lightgreen"
              onClick={() => setIosHelpOpen(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallAndPushBanner;
