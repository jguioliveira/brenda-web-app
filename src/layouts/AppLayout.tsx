import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      <header className="bg-white d-flex align-items-center">
        <div className="container-fluid boxed">
          <div className="row">
            <div className="col-auto">
              <Link to="/" title="Brenda Mello Makeup">
                <img src="/assets/img/brenda-mello-makeup.png" alt="Brenda Mello Makeup" />
              </Link>
            </div>

            <div className="col d-flex align-items-center justify-content-end justify-content-md-center">
              <nav className="d-md-flex align-items-center d-sm-none">
                <a href="/#top">Home</a>
                <a href="/#services">Services</a>
                <a href="/#makeup-course">Makeup Course</a>
                <a href="/#portfolio">Portfolio</a>
              </nav>

              <button type="button" className="menu-mobile-toggle d-flex d-md-none" onClick={toggleMenu} aria-expanded={menuOpen}>
                <span className="bars">
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <aside id="mobile-menu" className="d-none flex-column">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-end my-20">
                <button type="button" className="menu-mobile-toggle d-flex d-md-none" onClick={toggleMenu}>
                  <span className="bars">
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </span>
                </button>
              </div>

              <nav className="d-flex flex-column align-items-start">
                <a href="/#top" onClick={closeMenu}>Home</a>
                <a href="/#services" onClick={closeMenu}>Services</a>
                <a href="/#makeup-course" onClick={closeMenu}>Makeup Course</a>
                <a href="/#portfolio" onClick={closeMenu}>Portfolio</a>
              </nav>
            </div>
          </div>
        </div>
      </aside>

      <section id="top" className="d-flex justify-content-center align-items-center text-center">
        <div className="top-wrapper">
          <h1>Makeup, Hair, and Wedding Services</h1>
          <p>Transform Your Look Today! Book Your Makeup Session or Hair Styling Appointment Now!</p>
          <div className="top-buttons d-flex justify-content-center">
            <a href="/#about" className="btn btn-primary">About me</a>
            <a href="/#contact" className="btn btn-secondary">Contact me</a>
          </div>
        </div>
      </section>

      <Outlet />

      <div id="social-medias" className="d-flex justify-content-center text-center bg-dark-grey p-50">
        <div className="contact-wrapper d-flex flex-column align-items-center">
          <h2 className="text-white">Let us work together on your next look</h2>
          <p className="text-white">Follow along for makeup tips, behind the scenes, and booking updates.</p>

          <div>
            <a href="https://www.instagram.com/brendamellomakeup/" target="_blank" rel="noopener noreferrer" className="mr-10">
              <img src="/assets/img/icons/instagram_icon.png" alt="Follow me on Instagram" className="social-media-icons" />
            </a>
            <a href="https://wa.me/+61422406209" target="_blank" rel="noopener noreferrer" className="mr-10">
              <img src="/assets/img/icons/whatsapp_icon.png" alt="Text me on WhatsApp" className="social-media-icons" />
            </a>
            <a href="https://www.tiktok.com/@brendamellomakeup" target="_blank" rel="noopener noreferrer" className="mr-10">
              <img src="/assets/img/icons/tiktok_icon_white.png" alt="Follow me on TikTok" className="social-media-icons" />
            </a>
          </div>
        </div>
      </div>

      <footer className="text-center bg-dark-grey">
        <div className="container-fluid boxed">
          <div className="row">
            <div className="col">
              <p className="mb-0 text-white">&copy; 2024 - Brenda Mello Makeup</p>
            </div>
          </div>
        </div>
      </footer>

      <div id="menu-backdrop" role="presentation" onClick={closeMenu} />
    </>
  );
}
