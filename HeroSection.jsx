
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = ({ scrollToTools }) => {
  const handleExploreToolsClick = (e) => {
    e.preventDefault();
    if (scrollToTools) {
      scrollToTools();
    }
  };

  return (
    <section className="pt-36 pb-24 relative overflow-hidden hero-gradient">
      <div className="blob top-10 left-1/4 opacity-70"></div>
      <div className="blob bottom-10 right-1/4 opacity-70 animation-delay-3000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Your Go-To <span className="gradient-text">File & Data Toolkit</span> Online
          </motion.h1>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "circOut" }}
            className="text-xl text-muted-foreground mb-10"
          >
            Quick Converter provides a comprehensive suite of free, fast, and secure online tools for all your image conversion, text manipulation, and data utility needs. No software, no sign-ups, just instant results.
          </motion.p>
          
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "circOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button asChild size="lg" className="relative overflow-hidden group shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
              <a href="#tools" onClick={handleExploreToolsClick}>
                <span className="relative z-10 flex items-center"><Zap className="mr-2 h-5 w-5"/>Explore Tools</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-accent/30 transition-shadow duration-300">
              <RouterLink to="/about-us" className="flex items-center">
                Learn More <ChevronRight className="ml-1.5 h-4 w-4" />
              </RouterLink>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
