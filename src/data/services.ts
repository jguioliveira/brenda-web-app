export type ServiceItem = {
  slug: string;
  title: string;
  to: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

export const SERVICE_ITEMS: readonly ServiceItem[] = [
  {
    slug: "wedding",
    title: "Wedding",
    to: "/services/wedding",
    imageSrc: "/assets/img/team-01.jpg",
    imageAlt: "Wedding",
    description:
      "Ready to Shine on Your Special Day? Schedule Your Wedding Makeup and Hair Trial Today!",
  },
  {
    slug: "makeup-hair",
    title: "Makeup & Hair",
    to: "/services/makeup-hair",
    imageSrc: "/assets/img/team-02.jpg",
    imageAlt: "Makeup and Hair",
    description:
      "Enhance Your Natural Beauty Today! Book Your Makeup and Hair Appointment for a Stunning Look!",
  },
  {
    slug: "makeup",
    title: "Makeup",
    to: "/services/makeup",
    imageSrc: "/assets/img/team-03.jpg",
    imageAlt: "Makeup",
    description:
      "Discover Your Perfect Look! Schedule Your Makeup Appointment Today for Glamorous Results!",
  },
];
