import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ServicePage } from "./pages/ServicePage";

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="services/makeup" element={<ServicePage title="Makeup" />} />
            <Route path="services/makeup-course" element={<ServicePage title="Makeup Course" />} />
            <Route path="services/makeup-hair" element={<ServicePage title="Makeup & Hair" />} />
            <Route path="services/wedding" element={<ServicePage title="Wedding" />} />
          </Route>
          <Route path="/Home/Privacy" element={<Navigate to="/privacy" replace />} />
          <Route path="/Services/Makeup" element={<Navigate to="/services/makeup" replace />} />
          <Route path="/Services/MakeupCourse" element={<Navigate to="/services/makeup-course" replace />} />
          <Route path="/Services/MakeupHair" element={<Navigate to="/services/makeup-hair" replace />} />
          <Route path="/Services/Wedding" element={<Navigate to="/services/wedding" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
