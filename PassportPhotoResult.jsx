
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';

const PassportPhotoResult = ({ 
  croppedImageUrl, 
  previewCanvasRef, 
  outputWidthPx, 
  outputHeightPx, 
  onDownload,
  onCreatePhoto,
  isPhotoCreated,
  isImageSelected
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Result Preview & Download</h3>
      <div className="flex justify-center bg-background/50 p-2 rounded-lg mb-4 min-h-[200px] items-center">
        {croppedImageUrl ? (
          <img 
            src={croppedImageUrl} 
            alt="Cropped passport" 
            className="max-w-full max-h-[300px] object-contain border border-border"
          />
        ) : (
          <p className="text-muted-foreground">Preview will appear here after creating the photo.</p>
        )}
        <canvas
          ref={previewCanvasRef}
          style={{ display: 'none', width: outputWidthPx, height: outputHeightPx }}
        />
      </div>
      
      {!isPhotoCreated && isImageSelected && (
         <Button onClick={onCreatePhoto} className="w-full mb-2">
            <Camera className="mr-2 h-4 w-4" />Create Passport Photo (Crop)
        </Button>
      )}

      {isPhotoCreated && (
        <Button 
          onClick={onDownload}
          className="w-full relative overflow-hidden group"
          variant="outline"
        >
          <span className="relative z-10 flex items-center justify-center">
            <Download className="mr-2 h-4 w-4" />
            Download Photo
          </span>
        </Button>
      )}
    </motion.div>
  );
};

export default PassportPhotoResult;
