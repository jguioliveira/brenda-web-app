import { languages, useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/types";

type Props = {
  className?: string;
};

export function LanguageSwitcher({ className }: Props) {
  const { language, setLanguage } = useLanguage();

  return (
    <span className={["lang-switcher", className].filter(Boolean).join(" ")} aria-label="Language">
      {languages.map((item, index) => (
        <span key={item.code}>
          {index > 0 ? " | " : null}
          <button
            type="button"
            className={`lang-btn${language === item.code ? " is-active" : ""}`}
            onClick={() => setLanguage(item.code as Language)}
            aria-current={language === item.code ? "true" : undefined}
          >
            {item.label}
          </button>
        </span>
      ))}
    </span>
  );
}
