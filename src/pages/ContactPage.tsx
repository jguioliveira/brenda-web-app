import { Helmet } from "react-helmet-async";
import { ContactLinks } from "@/components/ContactLinks";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          {t.contact.title} | {t.meta.title}
        </title>
        <meta name="description" content={t.contact.intro} />
        <meta property="og:title" content={`${t.contact.title} | ${t.meta.title}`} />
        <meta property="og:description" content={t.contact.intro} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.siteUrl}/contact`} />
      </Helmet>

      <SiteHeader />

      <main>
        <section className="contact-section">
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
      </main>

      <SiteFooter />
    </>
  );
}
