
import React from 'react';
import { RefreshCw } from 'lucide-react';

const ImagePreviewSection = ({ imagePreview, resultPreview, isProcessing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
      {resultPreview ? (
        <div>
          <p className="text-sm font-medium mb-2 text-center">Result</p>
          <div
            className="aspect-square bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-2"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%23eee'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23eee'/%3E%3C/svg%3E")` }}
          >
            <img
              src={resultPreview}
              alt="Background removed preview"
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      ) : isProcessing ? (
        <div className="aspect-square bg-background/50 rounded-lg flex items-center justify-center p-2">
          <RefreshCw className="h-12 w-12 text-primary animate-spin" />
        </div>
      ) : imagePreview && (
        <div className="aspect-square bg-background/50 rounded-lg flex items-center justify-center p-2 opacity-50">
          <p className="text-muted-foreground">Preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreviewSection;
