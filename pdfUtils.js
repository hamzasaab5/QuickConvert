
import { jsPDF } from 'jspdf';

export const convertImagesToPdf = async (selectedFilesData) => {
  if (!Array.isArray(selectedFilesData) || selectedFilesData.length === 0) {
    throw new Error("No images selected or invalid data provided.");
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', 
  });

  for (let i = 0; i < selectedFilesData.length; i++) {
    const fileData = selectedFilesData[i];
    if (!fileData || !fileData.preview || typeof fileData.preview !== 'string') {
      console.warn(`Skipping invalid file data at index ${i}`);
      continue;
    }
    
    if (i > 0) {
      pdf.addPage();
    }
    
    const img = new Image();
    img.src = fileData.preview;
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = () => {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          const margin = 10; 
          const usableWidth = pageWidth - 2 * margin;
          const usableHeight = pageHeight - 2 * margin;

          const imgRatio = img.width / img.height;
          let finalWidth, finalHeight;
          
          if (img.width > usableWidth || img.height > usableHeight) {
            if (imgRatio > (usableWidth / usableHeight)) {
              finalWidth = usableWidth;
              finalHeight = finalWidth / imgRatio;
            } else {
              finalHeight = usableHeight;
              finalWidth = finalHeight * imgRatio;
            }
          } else {
            finalWidth = img.width;
            finalHeight = img.height;
          }
          
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
          
          try {
            pdf.addImage(fileData.preview, 'JPEG', x, y, finalWidth, finalHeight, undefined, 'FAST');
            resolve();
          } catch (e) {
            console.error("jsPDF addImage error:", e);
            reject(new Error(`Failed to add image ${fileData.name} to PDF: ${e.message}`));
          }
        };
        img.onerror = (error) => {
          console.error("Error loading image for PDF:", fileData.name, error);
          reject(new Error(`Failed to load image: ${fileData.name}`));
        };
      });
    } catch (error) {
      console.error(`Error processing image ${fileData.name}:`, error);
      throw error; 
    }
  }
  
  try {
    return pdf.output('datauristring');
  } catch (e) {
    console.error("jsPDF output error:", e);
    throw new Error(`Failed to generate PDF: ${e.message}`);
  }
};
