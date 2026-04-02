import { Helmet } from "react-helmet-async";

type Props = { title: string };

export function ServicePage({ title }: Props) {
  return (
    <>
      <Helmet>
        <title>{title} - Brenda Mello Makeup</title>
      </Helmet>
      <main className="container-fluid boxed py-50">
        <h1>{title}</h1>
        <p>More details about this service are coming soon.</p>
      </main>
    </>
  );
}
