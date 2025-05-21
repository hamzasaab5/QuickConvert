
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ApiProcessedImageDisplay = ({ apiResultImageUrl, handleDownloadApiResult, isProcessing }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">AI Processed Result</h3>
      <div className="flex justify-center bg-background/50 p-2 rounded-lg mb-4">
        <img-replace src={apiResultImageUrl} alt="AI Processed Passport Photo" className="max-w-full max-h-[400px] object-contain rounded" />
      </div>
      <Button 
        onClick={handleDownloadApiResult}
        className="w-full relative overflow-hidden group"
        variant="outline"
        disabled={isProcessing}
      >
        <Download className="mr-2 h-4 w-4" />
        Download AI Processed Photo
      </Button>
    </motion.div>
  );
};

export default ApiProcessedImageDisplay;
