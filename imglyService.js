
import React from 'react';
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

const DEFAULT_IMGLY_API_KEY = '4rZnvsfzyWUF5UazxRZsanMy';

export const removeImageBackground = async (file, apiKey, toastCallback, progressCallback) => {
  const effectiveApiKey = apiKey || DEFAULT_IMGLY_API_KEY;

  if (!effectiveApiKey) {
    toastCallback({
      title: "API Key Missing",
      description: "Background removal API key is not configured.",
      variant: "destructive",
      duration: 8000,
    });
    throw new Error("API Key Missing");
  }
  
  const config = {
    apiKey: effectiveApiKey,
    publicPath: 'https://cdn.img.ly/assets/demo/models/',
    debug: false,
    progress: (key, current, total) => {
      if (progressCallback) progressCallback(key, current, total);
      console.log(`Downloading ${key}: ${current} of ${total}`);
      toastCallback({
        title: "Processing...",
        description: `Downloading model: ${key} (${Math.round((current / total) * 100)}%)`,
        duration: 2000,
      });
    },
  };

  try {
    const imageBlob = await imglyRemoveBackground(file, config);
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error("Background removal error:", error);
    let errorMessage = "Failed to remove background.";
    if (error.message) {
      if (error.message.includes('fetch') && error.message.includes('401')) {
        errorMessage = "Authentication failed. Please check the API key or network connection.";
      } else if (error.message.includes('blob')) {
        errorMessage = "Error processing image blob. The image format might be unsupported or corrupted.";
      } else {
        errorMessage = `Error: ${error.message}. The @img.ly SDK might be having issues or model files are not accessible.`;
      }
    }
    
    toastCallback({
      title: "Background Removal Failed",
      description: errorMessage,
      variant: "destructive",
      duration: 8000,
    });
    throw error; 
  }
};
