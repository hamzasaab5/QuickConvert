
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const PdfPreviewAndNavigation = ({
  currentPage,
  totalPages,
  previewImages,
  conversionMessage,
  onPreviousPage,
  onNextPage,
  onDownloadPage,
  onDownloadAll,
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Conversion Result</h3>
      <div className="bg-background/30 rounded-lg p-4 mb-6 text-xs">
        <p>{conversionMessage}</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={onPreviousPage} disabled={currentPage <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
        <Button variant="outline" size="icon" onClick={onNextPage} disabled={currentPage >= totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-center items-center bg-background/50 p-2 rounded-lg mb-4 min-h-[300px]">
        {previewImages[currentPage - 1] ? (
          <img src={previewImages[currentPage - 1]} alt={`Page ${currentPage}`} className="max-w-full max-h-[400px] object-contain border border-border"/>
        ) : (
          <p>Loading preview...</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => onDownloadPage(currentPage - 1)} className="w-full sm:w-auto flex-1" variant="outline" disabled={!previewImages[currentPage - 1]}>
          <Download className="mr-2 h-4 w-4" />Download Page {currentPage}
        </Button>
        <Button onClick={onDownloadAll} className="w-full sm:w-auto flex-1" disabled={previewImages.length === 0}>
          <Download className="mr-2 h-4 w-4" />Download All ({totalPages}) Pages
        </Button>
      </div>
    </>
  );
};

export default PdfPreviewAndNavigation;
