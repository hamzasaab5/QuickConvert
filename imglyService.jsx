
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

const DEFAULT_IMGLY_API_KEY = 'Hqbb5t6ByoLKsBRhUBmHmmPE';

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
  
  if (!(file instanceof File) && !(file instanceof Blob)) {
    toastCallback({
      title: "Invalid File",
      description: "The provided item for background removal is not a valid file or blob.",
      variant: "destructive",
      duration: 8000,
    });
    throw new Error("Invalid file type for background removal.");
  }

  const config = {
    apiKey: effectiveApiKey,
    publicPath: 'https://cdn.img.ly/assets/demo/models/', 
    debug: process.env.NODE_ENV === 'development', 
    fetchArgs: { 
      mode: 'cors',
    },
    progress: (key, current, total) => {
      if (progressCallback) progressCallback(key, current, total);
      const progressPercentage = total > 0 ? Math.round((current / total) * 100) : 0;
      toastCallback({
        title: "Processing...",
        description: `Downloading AI model: ${key} (${progressPercentage}%)`,
        duration: 3000, 
      });
    },
  };

  try {
    toastCallback({
      title: "Starting Background Removal",
      description: "Please wait, this may take a moment. AI models are being loaded if this is your first time or cache was cleared.",
      duration: 5000,
    });
    const imageBlob = await imglyRemoveBackground(file, config);
    if (!(imageBlob instanceof Blob)) {
        throw new Error("Background removal did not return a valid Blob.");
    }
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error("Background removal error in imglyService:", error);
    let errorMessage = "Failed to remove background. An unexpected error occurred.";
    if (error && error.message) {
      if (error.message.toLowerCase().includes("url.startswith is not a function")) {
        errorMessage = "Configuration error with @img.ly SDK. Please ensure all paths are correct. If the problem persists, the SDK might have an issue.";
      } else if (error.message.includes('fetch') && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
        errorMessage = "Authentication failed. Please check your API key or network connection. The provided key might be invalid or expired.";
      } else if (error.message.includes('blob') || error.message.includes("did not return a valid Blob")) {
        errorMessage = "Error processing image data. The image format might be unsupported, corrupted, or the SDK failed to produce a valid output.";
      } else if (error.message.toLowerCase().includes('networkerror') || error.message.toLowerCase().includes('failed to fetch')) {
        errorMessage = "Network error. Please check your internet connection. The AI models or SDK resources might be temporarily unavailable or blocked.";
      } else if (error.message.includes('model')) {
         errorMessage = "Error loading AI model. Please try again. If the problem persists, the model files might be inaccessible or corrupted.";
      } else {
        errorMessage = `Error: ${error.message}.`;
      }
    }
    
    toastCallback({
      title: "Background Removal Failed",
      description: errorMessage,
      variant: "destructive",
      duration: 10000,
    });
    throw error; 
  }
};
