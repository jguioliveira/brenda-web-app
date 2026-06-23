import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/types";

const DISMISS_KEY = "brenda-artistry-lang-banner-dismissed";

function detectSuggestedLanguage(): Language | null {
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
  return null;
}

function getInitialBannerState(currentLanguage: Language) {
  if (localStorage.getItem(DISMISS_KEY)) {
    return { visible: false, suggested: null as Language | null };
  }

  const suggested = detectSuggestedLanguage();
  if (suggested && suggested !== currentLanguage) {
    return { visible: true, suggested };
  }

  return { visible: false, suggested: null as Language | null };
}

export function LanguageBanner() {
  const { language, setLanguage, t } = useLanguage();
  const [banner, setBanner] = useState(() => getInitialBannerState(language));

  if (!banner.visible || !banner.suggested) return null;

  const labels: Record<Language, string> = { en: "English", pt: "Português", es: "Español" };
  const suggested = banner.suggested;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setBanner({ visible: false, suggested: null });
  };

  const switchLanguage = () => {
    setLanguage(suggested);
    dismiss();
  };

  return (
    <div className="language-banner" role="region" aria-label="Language suggestion">
      <p>{t.langBanner.message.replace("{language}", labels[suggested])}</p>
      <div className="language-banner-actions">
        <button type="button" className="lang-banner-btn" onClick={switchLanguage}>
          {t.langBanner.switch.replace("{language}", labels[suggested])}
        </button>
        <button type="button" className="lang-banner-dismiss" onClick={dismiss}>
          {t.langBanner.dismiss}
        </button>
      </div>
    </div>
  );
}
