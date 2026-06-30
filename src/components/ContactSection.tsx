import { ContactLinks } from "@/components/ContactLinks";
import { InquiryForm } from "@/components/InquiryForm";
import { useLanguage } from "@/i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact-section">
      <span className="hero-tag">{t.contact.tag}</span>
      <h2 className="section-title centered">{t.contact.title}</h2>
      <p className="contact-intro">{t.contact.intro}</p>

      <InquiryForm />

      <div className="contact-steps">
        <h3 className="contact-steps-title">{t.contact.stepsTitle}</h3>
        <ol className="contact-steps-list">
          {t.contact.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="contact-direct">
        <p className="contact-direct-title">{t.contact.directTitle}</p>
        <ContactLinks className="contact-direct-links" />
      </div>
    </section>
  );
}
