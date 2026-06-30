import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/SiteHeader";
import { isServiceOption } from "@/data/site";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { LandingPage } from "@/pages/LandingPage";

function LegacyContactRedirect() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service");
  const destination =
    service && isServiceOption(service) ? `/?service=${service}#contact` : "/#contact";

  return <Navigate to={destination} replace />;
}

export function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <LanguageProvider>
          <BrowserRouter>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<LegacyContactRedirect />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
