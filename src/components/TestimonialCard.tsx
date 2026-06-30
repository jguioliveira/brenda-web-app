import { useState } from "react";
import type { Testimonial } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageContext";
import { truncateWords } from "@/utils/truncateWords";

const MAX_WORDS = 55;

type TestimonialCardProps = {
  item: Testimonial;
};

export function TestimonialCard({ item }: TestimonialCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const { text: preview, isTruncated } = truncateWords(item.message, MAX_WORDS);
  const showToggle = isTruncated;
  const displayText = expanded || !isTruncated ? item.message : preview;

  return (
    <article className="testimonial-card">
      <div className="testimonial-header">
        {item.photoUrl ? (
          <div className="testimonial-photo-frame">
            <img src={item.photoUrl} alt="" className="testimonial-photo" loading="lazy" />
          </div>
        ) : null}
        <div className="testimonial-meta">
          {item.name ? <div className="testimonial-author">{item.name}</div> : null}
          <div className="testimonial-sub">{t.form.services[item.service]}</div>
          <div className="testimonial-stars" aria-label={t.testimonials.ratingLabel}>
            {"★".repeat(item.rate)}
          </div>
        </div>
      </div>
      <p className="testimonial-text">&ldquo;{displayText}&rdquo;</p>
      {showToggle ? (
        <button
          type="button"
          className="testimonial-read-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? t.testimonials.readLess : t.testimonials.readMore}
        </button>
      ) : null}
    </article>
  );
}
