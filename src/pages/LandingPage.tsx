import { Helmet } from "react-helmet-async";
import { ContactLinks } from "@/components/ContactLinks";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";

export function LandingPage() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t.footer.copyright.replace("{year}", String(year));

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      <SiteHeader />

      <main>
        <section className="hero">
          <span className="hero-tag">{t.hero.tag}</span>
          <h1>
            {t.hero.title}
            <span>{t.hero.titleAccent}</span>.
          </h1>
          <p>{t.hero.body}</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-bridal">
              {t.hero.cta}
            </a>
          </div>
        </section>

        <section id="bridal" className="section-padding">
          <div className="split-container">
            <div className="content-box">
              <span className="hero-tag">{t.bridal.tag}</span>
              <h2 className="section-title">{t.bridal.title}</h2>
              <p className="body-text">{t.bridal.intro}</p>
              <p className="body-text accent-label">{t.bridal.reviewTitle}</p>
              <p className="body-text tight">{t.bridal.reviewBody}</p>
              <p className="body-text accent-label">{t.bridal.longevityTitle}</p>
              <p className="body-text tight">{t.bridal.longevityBody}</p>
              <a href="#contact" className="btn-bridal section-cta">
                {t.bridal.cta}
              </a>
            </div>
            <div className="image-box">
              <img src="/assets/img/team-01.jpg" alt={t.bridal.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="curls" className="section-padding curls-bg">
          <div className="split-container split-reverse">
            <div className="content-box">
              <span className="hero-tag">{t.curls.tag}</span>
              <h2 className="section-title">{t.curls.title}</h2>
              <p className="body-text">{t.curls.intro}</p>
              <p className="body-text accent-label">{t.curls.cuttingTitle}</p>
              <p className="body-text tight">{t.curls.cuttingBody}</p>
              <p className="session-note">{t.curls.note}</p>
              <p className="body-text accent-label spaced">{t.curls.lifestyleTitle}</p>
              <p className="body-text tight">{t.curls.lifestyleBody}</p>
              <a href="#contact" className="btn-bridal section-cta">
                {t.curls.cta}
              </a>
            </div>
            <div className="image-box image-box-light">
              <img src="/assets/img/team-03.jpg" alt={t.curls.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="events" className="section-padding">
          <div className="split-container">
            <div className="content-box">
              <span className="hero-tag">{t.events.tag}</span>
              <h2 className="section-title">{t.events.title}</h2>
              <p className="body-text">{t.events.intro}</p>
              <p className="body-text accent-label">{t.events.artistryTitle}</p>
              <p className="body-text tight">{t.events.artistryBody}</p>
              <p className="body-text accent-label">{t.events.mobileTitle}</p>
              <p className="body-text tight">{t.events.mobileBody}</p>
              <a href="#contact" className="btn-curls section-cta">
                {t.events.cta}
              </a>
            </div>
            <div className="image-box">
              <img src="/assets/img/team-02.jpg" alt={t.events.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="about" className="section-padding about-section">
          <div className="split-container">
            <div className="image-box image-box-accent">
              <img src="/assets/img/service-img.jpg" alt={t.about.imageAlt} loading="lazy" />
            </div>
            <div className="content-box about-text">
              <span className="hero-tag">{t.about.tag}</span>
              <h2 className="section-title">{t.about.title}</h2>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
              <p>{t.about.p4}</p>
              <div className="future-badge">{t.about.badge}</div>
            </div>
          </div>
        </section>

        <section className="instagram-callout">
          <p>{t.instagramCallout.line}</p>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            {SITE.instagramHandle}
          </a>
        </section>

        <section id="testimonials" className="testimonials-section">
          <span className="hero-tag">{t.testimonials.tag}</span>
          <h2 className="section-title centered">{t.testimonials.title}</h2>
          <div className="testimonials-grid">
            {t.testimonials.items.map((item) => (
              <article key={item.author} className="testimonial-card">
                <div className="quote-icon" aria-hidden="true">
                  “
                </div>
                <p className="testimonial-text">&ldquo;{item.quote}&rdquo;</p>
                <div className="testimonial-author">{item.author}</div>
                <div className="testimonial-sub">{item.sub}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <span className="hero-tag">{t.contact.tag}</span>
          <h2 className="section-title centered">{t.contact.title}</h2>
          <p className="contact-intro">{t.contact.intro}</p>
          <InquiryForm />
        </section>
      </main>

      <footer className="site-footer">
        <ContactLinks />
        <p className="footer-copy">{copyright}</p>
      </footer>
    </>
  );
}
