
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Image, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import SelectedImagesGrid from '@/components/jpg-to-pdf/SelectedImagesGrid';
import PdfPreview from '@/components/jpg-to-pdf/PdfPreview';
import { convertImagesToPdf } from '@/lib/pdfUtils';

const MAX_IMAGES_JPGS_TO_PDF = 50;

const JpgToPdf = () => {
  const [selectedFilesData, setSelectedFilesData] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const filesToAddCount = Math.min(files.length, MAX_IMAGES_JPGS_TO_PDF - selectedFilesData.length);
      const filesToAdd = files.slice(0, filesToAddCount);

      if (files.length > filesToAddCount) {
        toast({
          title: `File limit reached (${MAX_IMAGES_JPGS_TO_PDF})`,
          description: `You can select a maximum of ${MAX_IMAGES_JPGS_TO_PDF} images. Only the first ${filesToAddCount} of the newly selected files were added.`,
          variant: "destructive",
        });
      }

      const processFiles = filesToAdd.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              file,
              preview: e.target.result,
              name: file.name
            });
          };
          reader.onerror = (error) => {
            console.error("File reading error:", error);
            reject(new Error(`Failed to read file: ${file.name}`));
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(processFiles)
        .then(results => {
          setSelectedFilesData(prevFiles => [...prevFiles, ...results]);
          setPdfUrl('');
        })
        .catch(error => {
          console.error("Error processing files:", error);
          toast({
            title: "Error adding files",
            description: error.message || "Some files could not be added.",
            variant: "destructive",
          });
        });
    }
  }, [selectedFilesData.length, toast]);

  const handleRemoveFile = useCallback((index) => {
    setSelectedFilesData(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const handleConvert = useCallback(async () => {
    if (selectedFilesData.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to convert to PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setPdfUrl('');

    try {
      const pdfOutput = await convertImagesToPdf(selectedFilesData);
      setPdfUrl(pdfOutput);
      
      toast({
        title: "Conversion successful",
        description: `Created PDF with ${selectedFilesData.length} image${selectedFilesData.length > 1 ? 's' : ''}.`,
      });
    } catch (error) {
      console.error("JPG to PDF conversion error:", error);
      toast({
        title: "Conversion failed",
        description: error.message || "There was an error converting your images to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  }, [selectedFilesData, toast]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `converted_images.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  return (
    <>
      <Helmet>
        <title>JPG to PDF Converter - Convert Images to PDF Online | ConvertMaster</title>
        <meta name="description" content="Convert JPG, JPEG, and PNG images to PDF documents for free. Combine multiple images into a single PDF file easily with ConvertMaster's JPG to PDF tool. Supports large files and multiple images (up to 50)." />
        <meta name="keywords" content="jpg to pdf, convert jpg to pdf, image to pdf, png to pdf, combine images to pdf, online jpg to pdf converter, unlimited jpg to pdf" />
        <link rel="canonical" href="https://yourwebsite.com/jpg-to-pdf" />
      </Helmet>
      <div className="container mx-auto px-4 pt-32 pb-20">
        <ToolHeader
          title="JPG to PDF Converter"
          description={`Convert your JPG images to PDF documents. Combine multiple images (up to ${MAX_IMAGES_JPGS_TO_PDF}) into a single PDF file. No limits on individual image file sizes.`}
          icon={Image}
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8">
            <FileDropZone
              onFileSelect={handleFileSelect}
              acceptedFileTypes=".jpg,.jpeg,.png"
              maxFileSize={1000}
              maxFiles={MAX_IMAGES_JPGS_TO_PDF - selectedFilesData.length > 0 ? MAX_IMAGES_JPGS_TO_PDF - selectedFilesData.length : 0} 
              fileTypeDescription={`images (JPG, JPEG, PNG) - up to ${MAX_IMAGES_JPGS_TO_PDF} total`}
            />
          </div>
          
          {selectedFilesData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Selected Images ({selectedFilesData.length}/{MAX_IMAGES_JPGS_TO_PDF})</h3>
              
              <SelectedImagesGrid 
                selectedFiles={selectedFilesData} 
                onRemoveFile={handleRemoveFile}
                onAddMore={() => document.querySelector('input[type="file"]').click()}
                canAddMore={selectedFilesData.length < MAX_IMAGES_JPGS_TO_PDF}
              />
              
              <Button 
                onClick={handleConvert} 
                disabled={isConverting || selectedFilesData.length === 0}
                className="w-full mt-6 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  {isConverting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      Convert to PDF
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
          
          {pdfUrl && (
             <PdfPreview pdfUrl={pdfUrl} onDownload={handleDownload} />
          )}
        </div>
        <SeoContentJpgToPdf />
      </div>
    </>
  );
};

const SeoContentJpgToPdf = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create PDFs from Your Images Effortlessly</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          ConvertMaster's <strong>JPG to PDF Converter</strong> is your go-to solution for transforming images into professional PDF documents. Whether you have JPG, JPEG, or PNG files, our tool allows you to <strong>convert images to PDF</strong> quickly and easily. You can <strong>combine multiple images into a single PDF</strong>, making it perfect for creating portfolios, reports, or archives.
        </p>
        <p>
          Our <strong>online JPG to PDF converter</strong> is designed for simplicity and efficiency. Upload your images, arrange them if needed (feature coming soon!), and convert them into one consolidated PDF file. This tool is ideal for users searching for <strong>image to PDF</strong>, <strong>PNG to PDF</strong>, or <strong>combine JPG to PDF online</strong>. We support large individual image files and allow you to combine up to 50 images, providing an effectively <strong>unlimited JPG to PDF</strong> experience for most use cases. All processing is handled securely in your browser.
        </p>
        <p>
          From photographers creating contact sheets to students compiling visual notes, our <strong>JPG to PDF tool</strong> streamlines the process. Enjoy a free, fast, and reliable way to manage your image-to-document conversion needs with ConvertMaster.
        </p>
      </div>
    </div>
  </section>
);

export default JpgToPdf;
