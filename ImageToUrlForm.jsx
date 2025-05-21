
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const ImageToUrlForm = ({ imagePreview, isConverting, onConvert }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Convert to URL</h3>
      
      {imagePreview && (
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Image Preview</p>
          <div className="aspect-video bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-2">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
      
      <Button 
        onClick={onConvert} 
        disabled={isConverting}
        className="w-full relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center">
          {isConverting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              Convert to URL
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Button>
    </motion.div>
  );
};

export default ImageToUrlForm;
