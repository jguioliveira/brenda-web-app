import { Helmet } from "react-helmet-async";

const gallery = [
  { src: "/assets/img/card-01.jpg", alt: "Portfolio look 1" },
  { src: "/assets/img/card-02.jpg", alt: "Portfolio look 2" },
  { src: "/assets/img/card-03.jpg", alt: "Portfolio look 3" },
];

export function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio - Brenda Mello Makeup</title>
        <meta
          name="description"
          content="A selection of makeup and styling work by Brenda Mello."
        />
      </Helmet>
      <main className="container-fluid boxed py-50">
        <h1>Portfolio</h1>
        <p className="mb-30">
          A glimpse of recent looks and events. For bookings or full galleries, get in touch via the
          contact section.
        </p>
        <div className="row">
          {gallery.map((item) => (
            <div key={item.src} className="col-12 col-md-4 mb-30">
              <img src={item.src} alt={item.alt} className="w-100" loading="lazy" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
