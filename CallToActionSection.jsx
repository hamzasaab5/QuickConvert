
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = ({ scrollToTools, firstToolPath, title, subtitle, buttonText }) => {
  
  const handleGetStartedClick = (e) => {
    if (firstToolPath === "#tools" && scrollToTools) {
      e.preventDefault();
      scrollToTools();
    }
  };

  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      <div className="blob top-0 left-1/3 opacity-20 animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <ThumbsUp className="h-4 w-4 mr-2" /> User-Focused & Reliable
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay:0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale:0.9 }}
            whileInView={{ opacity: 1, scale:1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
          >
            <Button asChild size="lg" className="relative overflow-hidden group shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
              <RouterLink to={firstToolPath === "#tools" ? "#tools" : firstToolPath} onClick={handleGetStartedClick}>
                <span className="relative z-10 flex items-center"><TrendingUp className="mr-2 h-5 w-5"/>{buttonText}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </RouterLink>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
