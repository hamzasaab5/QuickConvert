
import React from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const renderPageToCanvasDataUrl = async (pdfDoc, pageNum, dpi, imageFormat, quality) => {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: dpi / 72 });
  
  const canvas = document.createElement('canvas');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  const renderContext = {
    canvasContext: canvas.getContext('2d'),
    viewport: viewport,
  };
  
  await page.render(renderContext).promise;
  return canvas.toDataURL(`image/${imageFormat}`, quality / 100);
};

export const processPdfDocument = async (file, dpi, imageFormat, quality, progressCallback) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const numPages = pdfDoc.numPages;
  const previews = [];

  for (let i = 1; i <= numPages; i++) {
    if (progressCallback) {
      progressCallback(`Rendering page ${i} of ${numPages}...`);
    }
    const dataUrl = await renderPageToCanvasDataUrl(pdfDoc, i, dpi, imageFormat, quality);
    previews.push(dataUrl);
  }
  
  return { previews, numPages };
};
