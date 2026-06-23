import type { ServiceOption } from "@/data/site";

export type Language = "en" | "pt" | "es";

export type Translations = {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  langBanner: {
    message: string;
    switch: string;
    dismiss: string;
  };
  header: {
    logo: string;
    subtitle: string;
    nav: {
      atelier: string;
      bridal: string;
      curls: string;
      events: string;
      about: string;
      reviews: string;
      contact: string;
    };
  };
  hero: {
    tag: string;
    title: string;
    titleAccent: string;
    body: string;
    cta: string;
    imageAlt: string;
  };
  bridal: {
    tag: string;
    title: string;
    intro: string;
    reviewTitle: string;
    reviewBody: string;
    longevityTitle: string;
    longevityBody: string;
    cta: string;
    imageAlt: string;
  };
  curls: {
    tag: string;
    title: string;
    intro: string;
    cuttingTitle: string;
    cuttingBody: string;
    note: string;
    lifestyleTitle: string;
    lifestyleBody: string;
    cta: string;
    imageAlt: string;
  };
  events: {
    tag: string;
    title: string;
    intro: string;
    artistryTitle: string;
    artistryBody: string;
    mobileTitle: string;
    mobileBody: string;
    cta: string;
    imageAlt: string;
  };
  about: {
    tag: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    badge: string;
    imageAlt: string;
  };
  portfolio: {
    tag: string;
    title: string;
    intro: string;
    viewMore: string;
    imageAlts: Record<ServiceOption, string>;
  };
  instagramCallout: {
    line: string;
    cta: string;
  };
  testimonials: {
    tag: string;
    title: string;
    ratingLabel: string;
    reviewsLink: string;
    items: readonly {
      quote: string;
      author: string;
      sub: string;
    }[];
  };
  contact: {
    tag: string;
    title: string;
    intro: string;
    stepsTitle: string;
    steps: readonly string[];
    directTitle: string;
    disclaimer: string;
  };
  form: {
    name: string;
    contact: string;
    service: string;
    eventDate: string;
    eventLocation: string;
    eventDatePlaceholder: string;
    eventLocationPlaceholder: string;
    message: string;
    submit: string;
    submitting: string;
    services: Record<ServiceOption, string>;
    errors: {
      name: string;
      contact: string;
      eventDate: string;
      eventLocation: string;
    };
    success: string;
    error: string;
  };
  footer: {
    copyright: string;
    instagram: string;
    whatsapp: string;
    email: string;
    phone: string;
  };
};
