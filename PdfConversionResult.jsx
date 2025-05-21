
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PdfConversionResult = ({ conversionMessage, canvasRef, handleDownload, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Conversion Result & Explanation</h3>
      <div className="bg-background/30 rounded-lg p-4 mb-6 text-xs"><pre className="whitespace-pre-wrap">{conversionMessage}</pre></div>
      <div className="flex justify-center items-center bg-background/50 p-2 rounded-lg mb-4 h-[250px]">
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain"></canvas>
      </div>
      <Button onClick={handleDownload} className="w-full mt-2" variant="outline" disabled={disabled}>
        <Download className="mr-2 h-4 w-4" />Download Simulated Image
      </Button>
    </motion.div>
  );
};

export default PdfConversionResult;
