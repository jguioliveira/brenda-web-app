import { Link } from "react-router-dom";

export function MakeupCourseSection() {
  return (
    <section id="makeup-course" className="py-0" style={{ backgroundColor: "#ead1dc" }}>
      <article className="service img-right">
        <div className="container-fluid boxed">
          <div className="row">
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
              <h2>Makeup Course</h2>
              <p>Empower Your Beauty Skills! Enroll Today in Our Self Makeup Course and Master the Art of Glam!.</p>
              <Link to="/services/makeup-course" className="btn btn-secondary mt-20">Know More</Link>
            </div>
            <div className="col-12 col-md-6">
              <img className="w-100" src="/assets/img/service-img.jpg" alt="Makeup Course" />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
