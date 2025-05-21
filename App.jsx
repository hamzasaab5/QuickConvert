
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ImageCompressor from '@/pages/ImageCompressor';
import ImageToUrl from '@/pages/ImageToUrl';
import SvgToJpg from '@/pages/SvgToJpg';
import JpgToPdf from '@/pages/JpgToPdf';
import CaseConverter from '@/pages/CaseConverter';
import HashGenerator from '@/pages/HashGenerator';
import ColorConverter from '@/pages/ColorConverter';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import { AnimatePresence } from 'framer-motion';

import PassportPhotoMaker from '@/pages/PassportPhotoMaker';
import ImageEnhancer from '@/pages/ImageEnhancer';
import ImageResizer from '@/pages/ImageResizer';
import BackgroundRemovalTool from '@/pages/BackgroundRemovalTool';


const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/image-to-url" element={<ImageToUrl />} />
        <Route path="/svg-to-jpg" element={<SvgToJpg />} />
        <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
        <Route path="/case-converter" element={<CaseConverter />} />
        <Route path="/hash-generator" element={<HashGenerator />} />
        <Route path="/color-converter" element={<ColorConverter />} />
        
        <Route path="/passport-photo-maker" element={<PassportPhotoMaker />} />
        <Route path="/image-enhancer" element={<ImageEnhancer />} />
        <Route path="/image-resizer" element={<ImageResizer />} />
        <Route path="/background-remover" element={<BackgroundRemovalTool />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
