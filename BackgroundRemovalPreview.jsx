
import React from 'react';

const BackgroundRemovalPreview = ({ imagePreview, resultPreview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {imagePreview && (
        <div>
          <p className="text-sm font-medium mb-2 text-center">Original Image</p>
          <div className="aspect-square bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-2">
            <img 
              src={imagePreview} 
              alt="Original for background removal" 
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
      {resultPreview && (
        <div>
          <p className="text-sm font-medium mb-2 text-center">Result (Simulated)</p>
          <div 
            className="aspect-square bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-2"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%23cccccc'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23cccccc'/%3E%3Crect x='10' width='10' height='10' fill='%23fafafa'/%3E%3Crect y='10' width='10' height='10' fill='%23fafafa'/%3E%3C/svg%3E")` }}
          >
            <img 
              src={resultPreview} 
              alt="Background removed preview" 
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
       {!imagePreview && !resultPreview && (
         <div className="md:col-span-2 text-center text-muted-foreground py-8">
            Upload an image to see the preview and result here.
         </div>
       )}
    </div>
  );
};

export default BackgroundRemovalPreview;
