import type { ServiceOption } from "@/data/site";

export type Language = "en" | "pt" | "es";

export type Translations = {
  meta: {
    title: string;
    description: string;
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
  instagramCallout: {
    line: string;
  };
  testimonials: {
    tag: string;
    title: string;
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
    disclaimer: string;
  };
  form: {
    name: string;
    contact: string;
    service: string;
    date: string;
    message: string;
    submit: string;
    services: Record<ServiceOption, string>;
    errors: {
      name: string;
      contact: string;
      date: string;
    };
    success: string;
  };
  footer: {
    copyright: string;
    instagram: string;
    whatsapp: string;
    email: string;
    phone: string;
  };
};
