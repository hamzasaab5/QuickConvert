
export const convertSvgToJpg = (svgContent, canvasElement, scale, quality) => {
  return new Promise((resolve, reject) => {
    if (!svgContent || typeof svgContent !== 'string') {
      return reject(new Error("Invalid SVG content provided."));
    }
    if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
      return reject(new Error("Invalid canvas element provided."));
    }
    if (typeof scale !== 'number' || scale <= 0) {
      return reject(new Error("Invalid scale value. Must be a positive number."));
    }
    if (typeof quality !== 'number' || quality < 0 || quality > 1) {
      return reject(new Error("Invalid quality value. Must be between 0 and 1."));
    }

    const img = new Image();
    const ctx = canvasElement.getContext('2d');

    img.onload = () => {
      canvasElement.width = img.width * scale;
      canvasElement.height = img.height * scale;
      
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
      
      try {
        const jpgDataUrl = canvasElement.toDataURL('image/jpeg', quality);
        URL.revokeObjectURL(img.src); 
        resolve(jpgDataUrl);
      } catch (e) {
        URL.revokeObjectURL(img.src);
        console.error("Canvas toDataURL error:", e);
        reject(new Error(`Failed to convert canvas to JPG: ${e.message}`));
      }
    };
    
    img.onerror = (error) => {
      URL.revokeObjectURL(img.src); 
      console.error("Image loading error from SVG blob:", error);
      reject(new Error("There was an error processing the SVG. Please ensure it's a valid SVG file."));
    };
    
    try {
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      img.src = URL.createObjectURL(svgBlob);
    } catch (e) {
      console.error("Blob creation or URL creation error:", e);
      reject(new Error(`Failed to create blob from SVG content: ${e.message}`));
    }
  });
};
