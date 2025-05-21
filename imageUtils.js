
import imageCompression from 'browser-image-compression';

export const compressImage = async (file, quality) => {
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided for compression.");
  }
  if (typeof quality !== 'number' || quality < 0 || quality > 1) {
    throw new Error("Invalid quality value. Must be between 0 and 1.");
  }

  const options = {
    maxSizeMB: Infinity, 
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality,
    alwaysKeepResolution: true,
    onProgress: null, 
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const compressedUrl = URL.createObjectURL(compressedFile);
    return { compressedFile, compressedUrl };
  } catch (error) {
    console.error("Error during image compression:", error);
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

export const formatBytes = (bytes, decimals = 2) => {
  if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) return '0 Bytes';
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
