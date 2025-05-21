
import React from 'react';
import { motion } from 'framer-motion';

const SvgPreview = ({ svgContent }) => {
  if (!svgContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">SVG Preview</h3>
      <div 
        className="bg-background/50 rounded-lg overflow-auto p-4 max-h-96 flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ aspectRatio: '16 / 9' }} 
      />
    </motion.div>
  );
};

export default SvgPreview;
