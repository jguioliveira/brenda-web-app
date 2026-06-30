import { Helmet } from "react-helmet-async";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialCard } from "@/components/TestimonialCard";
import { contactHref, SITE } from "@/data/site";
import { TESTIMONIALS } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageContext";

export function LandingPage() {
  const { t } = useLanguage();
  const ogImage = `${SITE.siteUrl}${SITE.heroImage}`;

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE.siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={t.meta.ogImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-media">
              <img src={SITE.heroImage} alt={t.hero.imageAlt} loading="eager" />
            </div>
            <div className="hero-copy">
              <span className="hero-tag">{t.hero.tag}</span>
              <h1>
                {t.hero.title}
                <span>{t.hero.titleAccent}</span>.
              </h1>
              <p>{t.hero.body}</p>
              <div className="hero-buttons">
                <a href={contactHref()} className="btn-bridal">
                  {t.hero.cta}
                </a>
              </div>
            </div>
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
              <a href={contactHref("bridal")} className="btn-bridal section-cta">
                {t.bridal.cta}
              </a>
            </div>
            <div className="image-box">
              <img src={SITE.bridalImage} alt={t.bridal.imageAlt} loading="lazy" />
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
              <p className="body-text accent-label spaced">{t.curls.lifestyleTitle}</p>
              <p className="body-text tight">{t.curls.lifestyleBody}</p>
              <a href={contactHref("curls")} className="btn-bridal section-cta">
                {t.curls.cta}
              </a>
            </div>
            <div className="image-box image-box-light">
              <img src={SITE.curlsImage} alt={t.curls.imageAlt} loading="lazy" />
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
              <a href={contactHref("events")} className="btn-curls section-cta">
                {t.events.cta}
              </a>
            </div>
            <div className="image-box">
              <img src={SITE.eventsImage} alt={t.events.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <span className="hero-tag">{t.testimonials.tag}</span>
          <h2 className="section-title centered">{t.testimonials.title}</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
          <a
            href={SITE.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials-link"
          >
            {t.testimonials.reviewsLink}
          </a>
        </section>

        <section id="portfolio" className="portfolio-section">
          <span className="hero-tag">{t.portfolio.tag}</span>
          <h2 className="section-title centered">{t.portfolio.title}</h2>
          <p className="portfolio-intro">{t.portfolio.intro}</p>
          <PortfolioCarousel />
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-more"
          >
            {t.portfolio.viewMore}
          </a>
        </section>

        <section id="about" className="section-padding about-section">
          <div className="split-container">
            <div className="image-box image-box-accent">
              <img src={SITE.aboutImage} alt={t.about.imageAlt} loading="lazy" />
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

        {SITE.showInstagramCallout ? (
          <section className="instagram-callout">
            <p>{t.instagramCallout.line}</p>
            <div className="instagram-preview">
              {SITE.instagramPreviewImages.map((src) => (
                <a
                  key={src}
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-preview-item"
                >
                  <img src={src} alt="" loading="lazy" />
                </a>
              ))}
            </div>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="instagram-cta">
              {t.instagramCallout.cta} - {SITE.instagramHandle}
            </a>
          </section>
        ) : null}

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
