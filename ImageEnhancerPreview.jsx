
import React from 'react';

const ImageEnhancerPreview = ({ imagePreview, imageStyle, imgRef }) => {
  if (!imagePreview) return null;

  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-2">Image Preview</p>
      <div className="aspect-video bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-2">
        <img 
          ref={imgRef}
          src={imagePreview} 
          alt="Preview for enhancement" 
          className="max-w-full max-h-full object-contain rounded"
          style={imageStyle}
          crossOrigin="anonymous" 
        />
      </div>
    </div>
  );
};

export default ImageEnhancerPreview;
