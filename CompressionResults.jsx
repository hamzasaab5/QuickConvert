
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const CompressionResults = ({ originalPreview, originalSize, compressedUrl, compressedSize, onDownload, formatBytes }) => {
  const calculateReduction = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Compression Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Original Image</p>
          <div className="aspect-video bg-background/50 rounded-lg overflow-hidden flex items-center justify-center">
            {originalPreview && (
              <img 
                src={originalPreview} 
                alt="Original" 
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">Size: {formatBytes(originalSize)}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Compressed Image</p>
          <div className="aspect-video bg-background/50 rounded-lg overflow-hidden flex items-center justify-center">
            {compressedUrl && (
              <img 
                src={compressedUrl} 
                alt="Compressed" 
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">Size: {formatBytes(compressedSize)}</p>
        </div>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Size Reduction</span>
          <span className="text-sm font-bold text-primary">{calculateReduction()}%</span>
        </div>
        <div className="w-full bg-background/50 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${calculateReduction()}%` }}
          ></div>
        </div>
      </div>
      
      <Button 
        onClick={onDownload}
        className="w-full flex items-center justify-center relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Compressed Image
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Button>
    </motion.div>
  );
};

export default CompressionResults;
