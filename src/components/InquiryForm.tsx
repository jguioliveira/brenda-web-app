import { type FormEvent, useState } from "react";
import type { ServiceOption } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageContext";

type FormState = {
  name: string;
  contact: string;
  service: ServiceOption;
  date: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  contact: "",
  service: "bridal",
  date: "",
  message: "",
};

export function InquiryForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
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
    if (!values.date.trim()) nextErrors.date = t.form.errors.date;
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
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

      <div className="form-field">
        <label htmlFor="inquiry-date">{t.form.date}</label>
        <input
          id="inquiry-date"
          type="text"
          value={values.date}
          onChange={(event) => updateField("date", event.target.value)}
          aria-invalid={Boolean(errors.date)}
        />
        {errors.date ? <p className="form-error">{errors.date}</p> : null}
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

      <button type="submit" className="btn-primary">
        {t.form.submit}
      </button>

      <p className="form-disclaimer">{t.contact.disclaimer}</p>
    </form>
  );
}
