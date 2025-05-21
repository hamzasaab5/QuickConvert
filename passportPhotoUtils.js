
import React from 'react';

export const createPassportPhoto = (image, canvas, cropData, toast) => {
  return new Promise((resolve, reject) => {
    if (!image || !canvas || !cropData) {
      reject(new Error("Missing image, canvas, or crop data."));
      return;
    }

    setTimeout(() => {
      try {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        canvas.width = cropData.width * scaleX;
        canvas.height = cropData.height * scaleY;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('No 2d context');
        }

        ctx.drawImage(
          image,
          cropData.x * scaleX,
          cropData.y * scaleY,
          cropData.width * scaleX,
          cropData.height * scaleY,
          0,
          0,
          cropData.width * scaleX,
          cropData.height * scaleY
        );
        toast({
          title: "Passport Photo Cropped",
          description: "The image has been cropped to the selected dimensions. Download the preview below.",
        });
        resolve();
      } catch (error) {
        console.error("Error in createPassportPhoto:", error);
        reject(error);
      }
    }, 500); 
  });
};

export const simulateAiPassportFeatures = (toast) => {
  return new Promise((resolve) => {
    toast({
      title: "AI Feature Simulation",
      description: "Simulating AI background adjustment and compliance checks...",
      duration: 2000,
    });
    setTimeout(() => {
      toast({
        title: "AI Features Simulated",
        description: "In a full version, AI would adjust background and check compliance. This demonstrates the concept.",
        duration: 5000,
      });
      resolve();
    }, 2500);
  });
};
