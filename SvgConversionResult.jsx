
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const SvgConversionResult = ({ jpgUrl, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Conversion Result</h3>
      
      <div className="bg-background/50 rounded-lg overflow-hidden mb-6">
        <img 
          src={jpgUrl} 
          alt="Converted JPG" 
          className="max-w-full h-auto mx-auto"
        />
      </div>
      
      <Button 
        onClick={onDownload}
        className="w-full flex items-center justify-center relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download JPG
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Button>
    </motion.div>
  );
};

export default SvgConversionResult;
