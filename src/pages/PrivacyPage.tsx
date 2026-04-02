import { Helmet } from "react-helmet-async";

export function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Brenda Mello Makeup</title>
      </Helmet>
      <main className="container-fluid boxed py-50">
        <h1>Privacy Policy</h1>
        <p>Use this page to detail your site&apos;s privacy policy.</p>
      </main>
    </>
  );
}
