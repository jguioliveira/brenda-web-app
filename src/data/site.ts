export const SITE = {
  name: "Brenda",
  brandSubtitle: "Premium Hair & Makeup Artistry",
  email: "contact@brendamello.com",
  phone: "+61422406209",
  phoneDisplay: "+61 422 406 209",
  instagram: "https://www.instagram.com/brendamellomakeup/",
  instagramHandle: "@brendamellomakeup",
  whatsapp: "https://wa.me/61422406209",
  googleReviewsUrl: "https://share.google/b5WRO5uPi4RBZ3acH",
  siteUrl: import.meta.env.VITE_SITE_URL ?? "https://brendamello.com",
  formspreeFormId: import.meta.env.VITE_FORMSPREE_FORM_ID ?? "",
  logoImage: "/assets/img/bm-logo.png",
  logoAlt: "Brenda Mello Beauty",
  heroImage: "/assets/img/IMG_4539.JPG",
  bridalImage: "/assets/img/noiva.jpg",
  curlsImage: "/assets/img/IMG_0779.jpg",
  eventsImage: "/assets/img/IMG_7739.jpg",
  aboutImage: "/assets/img/APC_0199.jpg",
  portfolioImages: [
    { src: "/assets/img/card-01.jpg", key: "bridal" as const },
    { src: "/assets/img/card-02.jpg", key: "events" as const },
    { src: "/assets/img/card-03.jpg", key: "curls" as const },
    { src: "/assets/img/team-01.jpg", key: "bridal" as const },
    { src: "/assets/img/team-02.jpg", key: "events" as const },
    { src: "/assets/img/team-03.jpg", key: "curls" as const },
  ],
  instagramPreviewImages: [
    "/assets/img/card-01.jpg",
    "/assets/img/team-01.jpg",
    "/assets/img/card-02.jpg",
    "/assets/img/team-02.jpg",
    "/assets/img/card-03.jpg",
    "/assets/img/team-03.jpg",
  ],
} as const;

export type ServiceOption = "bridal" | "curls" | "events";
export type PortfolioImageKey = (typeof SITE.portfolioImages)[number]["key"];

export function contactHref(service?: ServiceOption) {
  return service ? `/contact?service=${service}` : "/contact";
}

export function isServiceOption(value: string | null): value is ServiceOption {
  return value === "bridal" || value === "curls" || value === "events";
}
