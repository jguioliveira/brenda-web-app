import { Helmet } from "react-helmet-async";
import { AboutSection } from "@/pages/home/AboutSection";
import { ContactSection } from "@/pages/home/ContactSection";
import PortfolioSection from "@/pages/home/PortfolioSection";
import { ReviewsSection } from "@/pages/home/ReviewsSection";
import { ServicesSection } from "@/pages/home/ServicesSection";

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Brenda Mello Makeup</title>
        <meta
          name="description"
          content="Explore nossa seleção de maquiagens de alta qualidade para realçar sua beleza natural e expressar sua personalidade única."
        />
        <meta
          name="keywords"
          content="Maquiagem, Batom, Sombra, Base, Maquiagem profissional, Cosméticos, Beleza, Brenda Mello"
        />
        <meta name="author" content="Brenda Mello Makeups" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
