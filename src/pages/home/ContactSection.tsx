export function ContactSection() {
  return (
    <section id="contact" className="bg-light-grey">
      <article className="service img-right">
        <div className="container-fluid boxed">
          <div className="row">
            <div className="col">
              <h2>Contact me</h2>
              <p>
                If you have any questions, would like to book an appointment, or need more information about our services, please feel free to reach out. I am here to help you look and feel your best!
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" name="message" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Send</button>
              </form>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
