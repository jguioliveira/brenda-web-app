import type { ServiceOption } from "./site";
import testimonialsJson from "./testimonials.json";

export type Testimonial = {
  id: string;
  name: string | null;
  message: string;
  rate: number;
  service: ServiceOption;
  photoUrl: string | null;
};

export const TESTIMONIALS = testimonialsJson as Testimonial[];
