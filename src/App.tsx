import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/scroll-to-top";
import SiteLayout from "./components/site-layout";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import OurStory from "./pages/OurStory";
import OurTeam from "./pages/OurTeam";
import DonationPolicy from "./pages/Donation-Policy";
import Transparency from "./pages/Transparency";
import Donate from "./pages/Donate";
import DonorProjectTracker from "./pages/DonorProjectTracker";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/donor-project-tracker" element={<DonorProjectTracker />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/DonationPolicy" element={<DonationPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}