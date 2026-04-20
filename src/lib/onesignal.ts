// OneSignal Web SDK helper — initializes only on production / installed PWA contexts,
// never inside the Lovable editor preview iframe (service workers misbehave there).

const ONESIGNAL_APP_ID = "e83e6838-20dd-431f-9547-d042b0ea7b8b";

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

let initStarted = false;

const isInIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

const isPreviewHost = (): boolean => {
  const h = window.location.hostname;
  return (
    h.includes("id-preview--") ||
    h.includes("lovableproject.com") ||
    h.includes("lovable.app") && h.includes("id-preview")
  );
};

export const canUsePush = (): boolean => {
  if (typeof window === "undefined") return false;
  if (isInIframe()) return false;
  if (isPreviewHost()) return false;
  if (!("serviceWorker" in navigator)) return false;
  if (!("Notification" in window)) return false;
  return true;
};

export const initOneSignal = async (): Promise<void> => {
  if (initStarted) return;
  if (!canUsePush()) {
    console.log("[OneSignal] Skipped init (preview/iframe/unsupported)");
    return;
  }
  initStarted = true;

  // Inject SDK script if not already present
  if (!document.querySelector('script[data-onesignal-sdk="1"]')) {
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    script.setAttribute("data-onesignal-sdk", "1");
    document.head.appendChild(script);
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    try {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: false,
        notifyButton: { enable: false },
      });
      console.log("[OneSignal] Initialized");
    } catch (e) {
      console.error("[OneSignal] init failed:", e);
    }
  });
};

// Tag subscriber with user_id + email so admin broadcasts can be audited later
export const tagOneSignalUser = (userId: string, email?: string | null): void => {
  if (!canUsePush()) return;
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    try {
      await OneSignal.login(userId);
      if (email) await OneSignal.User.addEmail(email);
    } catch (e) {
      console.error("[OneSignal] tag failed:", e);
    }
  });
};

export const requestPushPermission = async (): Promise<boolean> => {
  if (!canUsePush()) return false;
  return new Promise((resolve) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        await OneSignal.Notifications.requestPermission();
        resolve(OneSignal.Notifications.permission === true);
      } catch (e) {
        console.error("[OneSignal] permission request failed:", e);
        resolve(false);
      }
    });
  });
};

export const isPushSubscribed = async (): Promise<boolean> => {
  if (!canUsePush()) return false;
  return new Promise((resolve) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        resolve(OneSignal.User.PushSubscription.optedIn === true);
      } catch {
        resolve(false);
      }
    });
  });
};
