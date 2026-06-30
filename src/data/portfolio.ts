import type { ServiceOption } from "./site";
import portfolioJson from "./portfolio.json";

export type PortfolioItem = {
  id: string;
  src: string;
  service?: ServiceOption;
};

export const PORTFOLIO = portfolioJson as PortfolioItem[];
