import { useEffect } from "react";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

export default function PortfolioSection() {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      startAt: 0,
      breakpoints: {
        1200: { perView: 2 },
        768: { perView: 1 },
      },
    });
    glide.mount();
    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <section id="portfolio" className="bg-white">
      <div className="container-fluid boxed">
        <div className="row">
          <div className="col">
            <h2>Portfolio</h2>
            <div className="glide">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  <li className="glide__slide">
                    <Link to="/portfolio">
                      <img src="/assets/img/card-01.jpg" alt="Portfolio item" className="w-100" />
                    </Link>
                  </li>
                  <li className="glide__slide">
                    <Link to="/portfolio">
                      <img src="/assets/img/card-02.jpg" alt="Portfolio item" className="w-100" />
                    </Link>
                  </li>
                  <li className="glide__slide">
                    <Link to="/portfolio">
                      <img src="/assets/img/card-03.jpg" alt="Portfolio item" className="w-100" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/portfolio" className="btn btn-secondary mt-20">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
}
