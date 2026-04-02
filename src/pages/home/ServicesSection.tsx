import { Link } from "react-router-dom";

export function ServicesSection() {
  return (
    <section id="services" className="bg-light-grey">
      <div className="container-fluid boxed">
        <div className="row">
          <div className="col-12 col-md-4 d-flex flex-column text-sm-center text-md-left">
            <h3>Wedding</h3>
            <img src="/assets/img/team-01.jpg" alt="Wedding" className="mb-30" />
            <p>Ready to Shine on Your Special Day? Schedule Your Wedding Makeup and Hair Trial Today!</p>
            <div className="d-flex justify-content-center mt-auto">
              <Link to="/services/wedding" className="btn btn-primary me-2">Know More</Link>
              <a href="/#contact" className="btn btn-secondary">Contact me</a>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex flex-column text-sm-center text-md-left">
            <h3>Makeup & Hair</h3>
            <img src="/assets/img/team-02.jpg" alt="Makeup and Hair" className="mb-30" />
            <p>Enhance Your Natural Beauty Today! Book Your Makeup and Hair Appointment for a Stunning Look!</p>
            <div className="d-flex justify-content-center mt-auto">
              <Link to="/services/makeup-hair" className="btn btn-primary me-2">Know More</Link>
              <a href="/#contact" className="btn btn-secondary">Contact me</a>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex flex-column text-sm-center text-md-left">
            <h3>Makeup</h3>
            <img src="/assets/img/team-03.jpg" alt="Makeup" className="mb-30" />
            <p>Discover Your Perfect Look! Schedule Your Makeup Appointment Today for Glamorous Results!</p>
            <div className="d-flex justify-content-center mt-auto">
              <Link to="/services/makeup" className="btn btn-primary me-2">Know More</Link>
              <a href="/#contact" className="btn btn-secondary">Contact me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
