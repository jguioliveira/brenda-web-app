/** Used for mailto only; not shown in the UI */
const CONTACT_EMAIL = "hello@brendamellomakeup.com";

const CONTACT = {
  whatsapp: "https://wa.me/61422406209",
  instagram: "https://www.instagram.com/brendamellomakeup/",
  sms: "sms:+61422406209",
  email: `mailto:${CONTACT_EMAIL}`,
} as const;

function SmsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6h16v12H4V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-white">
      <article className="service img-right">
        <div className="container-fluid boxed">
          <div className="row">
            <div className="col">
              <h2>Contact me</h2>
              <p>
                If you have any questions, would like to book an appointment, or need more information
                about our services, reach out on WhatsApp, Instagram, SMS, or email.
              </p>
              <nav className="contact-channels" aria-label="Contact options">
                <a
                  href={CONTACT.whatsapp}
                  className="contact-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel-icon-wrap" aria-hidden={true}>
                    <img
                      src="/assets/img/icons/whatsapp_icon.png"
                      alt=""
                      width={28}
                      height={28}
                      className="contact-channel-img"
                    />
                  </span>
                  <span className="contact-channel-label">WhatsApp</span>
                </a>
                <a
                  href={CONTACT.instagram}
                  className="contact-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel-icon-wrap" aria-hidden={true}>
                    <img
                      src="/assets/img/icons/instagram_icon.png"
                      alt=""
                      width={28}
                      height={28}
                      className="contact-channel-img"
                    />
                  </span>
                  <span className="contact-channel-label">Instagram</span>
                </a>
                <a href={CONTACT.sms} className="contact-channel">
                  <span className="contact-channel-icon-wrap" aria-hidden={true}>
                    <SmsIcon className="contact-channel-icon" />
                  </span>
                  <span className="contact-channel-label">SMS</span>
                </a>
                <a
                  href={CONTACT.email}
                  className="contact-channel"
                  aria-label={`Send email to ${CONTACT_EMAIL}`}
                >
                  <span className="contact-channel-icon-wrap" aria-hidden={true}>
                    <EmailIcon className="contact-channel-icon" />
                  </span>
                  <span className="contact-channel-label">Email</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
