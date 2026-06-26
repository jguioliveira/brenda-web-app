import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContactLinks } from "@/components/ContactLinks";
import { LanguageBanner } from "@/components/LanguageBanner";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLanguage } from "@/i18n/LanguageContext";

type NavLink = {
  href: string;
  label: string;
  sectionId: string | null;
};

function SectionNavLinks({
  links,
  activeSection,
  atTop,
  pathname,
  onNavigate,
}: {
  links: NavLink[];
  activeSection: string | null;
  atTop: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const handleClick = () => onNavigate?.();

  const isLinkActive = (sectionId: string | null) => {
    if (sectionId === "contact") return pathname === "/contact";
    if (pathname !== "/") return false;
    if (sectionId === null) return atTop && activeSection === null;
    return activeSection === sectionId;
  };

  return (
    <>
      {links.map(({ href, label, sectionId }) => {
        const isActive = isLinkActive(sectionId);

        return (
          <a
            key={href}
            href={href}
            className={isActive ? "is-active" : undefined}
            aria-current={isActive ? "page" : undefined}
            onClick={handleClick}
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const activeSection = useActiveSection();
  const mobileMenuRef = useRef<HTMLElement>(null);

  const navLinks: NavLink[] = [
    { href: "/", label: t.header.nav.atelier, sectionId: null },
    { href: "/#bridal", label: t.header.nav.bridal, sectionId: "bridal" },
    { href: "/#curls", label: t.header.nav.curls, sectionId: "curls" },
    { href: "/#events", label: t.header.nav.events, sectionId: "events" },
    { href: "/#testimonials", label: t.header.nav.reviews, sectionId: "testimonials" },
    { href: "/#about", label: t.header.nav.about, sectionId: "about" },
    { href: "/contact", label: t.header.nav.contact, sectionId: "contact" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 48);
      setAtTop(window.scrollY < 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  const headerClassName = ["site-header", compact ? "is-compact" : "", menuOpen ? "menu-open-header" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <LanguageBanner />

      <header className={headerClassName} id="top">
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

          <a href="/" className="header-brand" onClick={closeMenu}>
            <div className="logo-title">{t.header.logo}</div>
            <div className="logo-subtitle">{t.header.subtitle}</div>
          </a>

          <div className="header-bar-end">
            <LanguageSwitcher className="header-lang-mobile" />
            <div className="header-bar-spacer" aria-hidden="true" />
          </div>
        </div>

        <nav className="site-nav desktop-nav" aria-label="Main">
          <SectionNavLinks
            links={navLinks}
            activeSection={activeSection}
            atTop={atTop}
            pathname={pathname}
          />
          <LanguageSwitcher className="header-lang-desktop" />
        </nav>
      </header>

      <aside
        id="mobile-menu"
        ref={mobileMenuRef}
        className="mobile-menu"
        aria-hidden={!menuOpen}
      >
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
            <SectionNavLinks
              links={navLinks}
              activeSection={activeSection}
              atTop={atTop}
              pathname={pathname}
              onNavigate={closeMenu}
            />
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
