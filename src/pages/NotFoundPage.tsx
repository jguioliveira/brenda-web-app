import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found - Brenda Mello Makeup</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="container-fluid boxed py-50 text-center">
        <h1 className="mb-30">Page not found</h1>
        <p className="mb-30">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </main>
    </>
  );
}
