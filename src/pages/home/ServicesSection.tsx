import { Link } from "react-router-dom";
import { SERVICE_ITEMS } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="bg-light-grey">
      <div className="container-fluid boxed">
        <div className="row">
          {SERVICE_ITEMS.map((item) => (
            <div
              key={item.slug}
              className="col-12 col-md-4 d-flex flex-column text-sm-center text-md-left"
            >
              <Link to={item.to} className="service-card-link d-flex flex-column flex-grow-1">
                <h3>{item.title}</h3>
                <img src={item.imageSrc} alt={item.imageAlt} className="mb-30" />
                <p className="mt-auto">{item.description}</p>
              </Link>
              <div className="d-flex justify-content-center mt-auto">
                <Link to={item.to} className="btn btn-secondary me-2">
                  Know More
                </Link>
                <a href="/#contact" className="btn btn-primary">
                  Contact me
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
