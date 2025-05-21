
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PassportPhotoResultDisplay = ({ canvasRef, completedCrop, handleDownload, downloadText, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Manually Cropped Preview</h3>
      <div className="flex justify-center bg-background/50 p-2 rounded-lg mb-4">
        <canvas
          ref={canvasRef}
          className="max-w-full"
          style={{
            objectFit: 'contain',
            width: completedCrop ? Math.min(300, completedCrop.width) : 0,
            height: completedCrop ? Math.min(300 * (completedCrop.height / completedCrop.width), completedCrop.height) : 0,
          }}
        />
      </div>
      <Button 
        onClick={handleDownload}
        className="w-full relative overflow-hidden group"
        variant="outline"
        disabled={disabled}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Download className="mr-2 h-4 w-4" />
          {downloadText}
        </span>
      </Button>
    </motion.div>
  );
};

export default PassportPhotoResultDisplay;
