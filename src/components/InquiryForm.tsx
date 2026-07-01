import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isServiceOption, SITE, type ServiceOption } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/types";

type FormState = {
  name: string;
  contact: string;
  service: ServiceOption;
  eventDate: string;
  eventLocation: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  contact: "",
  service: "bridal",
  eventDate: "",
  eventLocation: "",
  message: "",
};

const DATE_INPUT_LOCALE: Record<Language, string> = {
  en: "en-AU",
  pt: "pt-BR",
  es: "es",
};

function todayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatEventDate(isoDate: string, locale: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}

async function sendInquiry(
  values: FormState,
  serviceLabel: string,
  dateLocale: string,
  language: Language,
): Promise<boolean> {
  const eventDate = formatEventDate(values.eventDate.trim(), dateLocale);
  const payload = {
    name: values.name.trim(),
    contact: values.contact.trim(),
    service: serviceLabel,
    eventDate,
    eventLocation: values.eventLocation.trim(),
    message: values.message.trim(),
    language,
  };

  if (SITE.contactApiUrl) {
    const response = await fetch(`${SITE.contactApiUrl.replace(/\/$/, "")}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  }

  if (SITE.formspreeFormId) {
    const response = await fetch(`https://formspree.io/f/${SITE.formspreeFormId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        _subject: `Enquiry: ${serviceLabel}`,
      }),
    });
    return response.ok;
  }

  const subject = encodeURIComponent(`Enquiry: ${serviceLabel}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Contact: ${payload.contact}`,
      `Service: ${payload.service}`,
      `Date: ${payload.eventDate}`,
      `Location: ${payload.eventLocation}`,
      "",
      payload.message,
    ].join("\n"),
  );
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  return true;
}

export function InquiryForm() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const minEventDate = useMemo(() => todayIsoDate(), []);
  const dateInputLocale = DATE_INPUT_LOCALE[language];

  useEffect(() => {
    const service = searchParams.get("service");
    if (isServiceOption(service)) {
      setValues((current) => ({ ...current, service }));
    }
  }, [searchParams]);

  const updateField = <K extends keyof FormState,>(field: K, value: FormState[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = t.form.errors.name;
    if (!values.contact.trim()) nextErrors.contact = t.form.errors.contact;
    if (!values.eventDate.trim()) nextErrors.eventDate = t.form.errors.eventDate;
    if (!values.eventLocation.trim()) nextErrors.eventLocation = t.form.errors.eventLocation;
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const ok = await sendInquiry(values, t.form.services[values.service], dateInputLocale, language);
      if (ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <p>{t.form.success}</p>
      </div>
    );
  }

  const serviceOptions: ServiceOption[] = ["bridal", "curls", "events"];

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="inquiry-name">{t.form.name}</label>
        <input
          id="inquiry-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="form-error">{errors.name}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="inquiry-contact">{t.form.contact}</label>
        <input
          id="inquiry-contact"
          type="text"
          autoComplete="email tel"
          value={values.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
        />
        {errors.contact ? <p className="form-error">{errors.contact}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="inquiry-service">{t.form.service}</label>
        <select
          id="inquiry-service"
          value={values.service}
          onChange={(event) => updateField("service", event.target.value as ServiceOption)}
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {t.form.services[option]}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="inquiry-date">{t.form.eventDate}</label>
          <input
            id="inquiry-date"
            type="date"
            lang={dateInputLocale}
            min={minEventDate}
            value={values.eventDate}
            onChange={(event) => updateField("eventDate", event.target.value)}
            aria-invalid={Boolean(errors.eventDate)}
          />
          {errors.eventDate ? <p className="form-error">{errors.eventDate}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="inquiry-location">{t.form.eventLocation}</label>
          <input
            id="inquiry-location"
            type="text"
            value={values.eventLocation}
            placeholder={t.form.eventLocationPlaceholder}
            onChange={(event) => updateField("eventLocation", event.target.value)}
            aria-invalid={Boolean(errors.eventLocation)}
          />
          {errors.eventLocation ? <p className="form-error">{errors.eventLocation}</p> : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="inquiry-message">{t.form.message}</label>
        <textarea
          id="inquiry-message"
          rows={4}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </div>

      {submitError ? <p className="form-error form-error-banner">{t.form.error}</p> : null}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? t.form.submitting : t.form.submit}
      </button>

      <p className="form-disclaimer">{t.contact.disclaimer}</p>
    </form>
  );
}
