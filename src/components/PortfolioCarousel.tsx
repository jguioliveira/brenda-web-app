import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PORTFOLIO } from "@/data/portfolio";
import { SITE } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";

export function PortfolioCarousel() {
  const { t } = useLanguage();
  const glideRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = glideRootRef.current;
    if (!root) return;

    const glide = new Glide(root, {
      type: "carousel",
      startAt: 0,
      perView: 3,
      gap: 16,
      focusAt: "center",
      breakpoints: {
        1024: { perView: 2, gap: 12 },
        640: { perView: 1, gap: 8 },
      },
    });

    glide.mount();

    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <div className="portfolio-carousel">
      <div ref={glideRootRef} className="portfolio-glide glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {PORTFOLIO.map((item) => (
              <li key={item.id} className="glide__slide">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <OptimizedImage
                    src={item.src}
                    alt={
                      item.service
                        ? t.portfolio.imageAlts[item.service]
                        : t.portfolio.defaultImageAlt
                    }
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="glide__arrows portfolio-glide__arrows" data-glide-el="controls">
          <button
            type="button"
            className="glide__arrow glide__arrow--left portfolio-glide__arrow"
            data-glide-dir="<"
            aria-label={t.portfolio.prevSlide}
          >
            ‹
          </button>
          <button
            type="button"
            className="glide__arrow glide__arrow--right portfolio-glide__arrow"
            data-glide-dir=">"
            aria-label={t.portfolio.nextSlide}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
