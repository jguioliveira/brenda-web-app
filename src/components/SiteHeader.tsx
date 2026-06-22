import { useEffect, useState } from "react";
import { ContactLinks } from "@/components/ContactLinks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

function SectionNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLanguage();
  const handleClick = () => onNavigate?.();

  return (
    <>
      <a href="#top" onClick={handleClick}>
        {t.header.nav.atelier}
      </a>
      <a href="#bridal" onClick={handleClick}>
        {t.header.nav.bridal}
      </a>
      <a href="#curls" onClick={handleClick}>
        {t.header.nav.curls}
      </a>
      <a href="#events" onClick={handleClick}>
        {t.header.nav.events}
      </a>
      <a href="#about" onClick={handleClick}>
        {t.header.nav.about}
      </a>
      <a href="#testimonials" onClick={handleClick}>
        {t.header.nav.reviews}
      </a>
      <a href="#contact" onClick={handleClick}>
        {t.header.nav.contact}
      </a>
    </>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <>
      <header className="site-header" id="top">
        <div className="header-bar">
          <button
            type="button"
            className="menu-toggle"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="bars">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </span>
          </button>

          <div className="header-brand">
            <div className="logo-title">{t.header.logo}</div>
            <div className="logo-subtitle">{t.header.subtitle}</div>
          </div>

          <div className="header-bar-spacer" aria-hidden="true" />
        </div>

        <nav className="site-nav desktop-nav" aria-label="Main">
          <SectionNavLinks />
          <LanguageSwitcher />
        </nav>
      </header>

      <aside id="mobile-menu" className="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <button
            type="button"
            className="menu-toggle menu-toggle-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span className="bars">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </span>
          </button>

          <nav className="mobile-nav" aria-label="Mobile">
            <SectionNavLinks onNavigate={closeMenu} />
          </nav>

          <LanguageSwitcher />

          <div className="mobile-menu-bottom">
            <ContactLinks className="mobile-contact-links" onNavigate={closeMenu} />
          </div>
        </div>
      </aside>

      <div
        className="menu-backdrop"
        role="presentation"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
    </>
  );
}
