
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const ShowcaseSection = ({ title, paragraph1, paragraph2 }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
      className="container mx-auto px-4 relative -mt-12 z-10" 
    >
      <div className="relative mx-auto max-w-4xl perspective-container">
        <div className="card-3d rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-secondary/20 p-8 text-center">
           <h2 className="text-3xl font-bold mb-4 gradient-text">{title}</h2>
           <p className="text-lg text-muted-foreground mb-6">
             {paragraph1}
           </p>
           <p className="text-lg text-muted-foreground">
             {paragraph2}
           </p>
        </div>
        
        <motion.div 
          initial={{ opacity:0, y: 20 }}
          animate={{ opacity:1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg"
        >
          <p className="text-sm font-medium text-foreground flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" /> Join thousands of satisfied users!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShowcaseSection;
