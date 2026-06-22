import {
  EmailIcon,
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ContactIcons";
import { SITE } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";

type Props = {
  className?: string;
  onNavigate?: () => void;
};

export function ContactLinks({ className = "footer-links", onNavigate }: Props) {
  const { t } = useLanguage();

  const handleClick = () => onNavigate?.();

  const items = [
    {
      href: SITE.instagram,
      label: t.footer.instagram,
      icon: InstagramIcon,
      external: true,
    },
    {
      href: SITE.whatsapp,
      label: t.footer.whatsapp,
      icon: WhatsAppIcon,
      external: true,
    },
    {
      href: `mailto:${SITE.email}`,
      label: t.footer.email,
      icon: EmailIcon,
      external: false,
    },
    {
      href: `tel:${SITE.phone}`,
      label: t.footer.phone,
      icon: PhoneIcon,
      external: false,
    },
  ] as const;

  return (
    <nav className={className} aria-label="Contact">
      {items.map(({ href, label, icon: Icon, external }) => (
        <a
          key={href}
          href={href}
          className="contact-link"
          aria-label={label}
          onClick={handleClick}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon />
          <span className="contact-link-label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
