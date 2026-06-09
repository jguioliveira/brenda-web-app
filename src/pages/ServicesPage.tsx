import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SERVICE_ITEMS } from "@/data/services";

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services - Brenda Mello Makeup</title>
        <meta
          name="description"
          content="Wedding, makeup & hair, and makeup services — book your session with Brenda Mello."
        />
      </Helmet>
      <main className="bg-light-grey">
        <section className="container-fluid boxed py-50">
          <h1 className="mb-30">Services</h1>
          <p className="mb-30">
            Choose a service to learn more, or get in touch from any page to book.
          </p>
          <div className="row">
            {SERVICE_ITEMS.map((item) => (
              <div
                key={item.slug}
                className="col-12 col-md-4 d-flex flex-column text-sm-center text-md-left mb-30"
              >
                <Link to={item.to} className="service-card-link d-flex flex-column flex-grow-1">
                  <h2 className="h3">{item.title}</h2>
                  <img src={item.imageSrc} alt={item.imageAlt} className="mb-30" />
                  <p className="mt-auto">{item.description}</p>
                </Link>
                <div className="d-flex justify-content-center mt-auto">
                  <Link to={item.to} className="btn btn-secondary me-2">
                    Know More
                  </Link>
                  <Link to="/#contact" className="btn btn-primary">
                    Contact me
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
