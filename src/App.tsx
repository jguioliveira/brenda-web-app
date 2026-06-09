import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/layouts/AppLayout";
import { HomePage } from "@/pages/HomePage";

const PrivacyPage = lazy(() =>
  import("@/pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })),
);
const ServicePage = lazy(() =>
  import("@/pages/ServicePage").then((m) => ({ default: m.ServicePage })),
);
const PortfolioPage = lazy(() =>
  import("@/pages/PortfolioPage").then((m) => ({ default: m.PortfolioPage })),
);
const ServicesPage = lazy(() =>
  import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

function RouteFallback() {
  return (
    <div className="container-fluid boxed py-50 text-center">
      <p>Loading…</p>
    </div>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="services/makeup" element={<ServicePage title="Makeup" />} />
                <Route
                  path="services/makeup-course"
                  element={<ServicePage title="Makeup Course" />}
                />
                <Route
                  path="services/makeup-hair"
                  element={<ServicePage title="Makeup & Hair" />}
                />
                <Route path="services/wedding" element={<ServicePage title="Wedding" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/Home/Privacy" element={<Navigate to="/privacy" replace />} />
              <Route path="/Services" element={<Navigate to="/services" replace />} />
              <Route path="/Services/Makeup" element={<Navigate to="/services/makeup" replace />} />
              <Route
                path="/Services/MakeupCourse"
                element={<Navigate to="/services/makeup-course" replace />}
              />
              <Route
                path="/Services/MakeupHair"
                element={<Navigate to="/services/makeup-hair" replace />}
              />
              <Route path="/Services/Wedding" element={<Navigate to="/services/wedding" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
