
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileImage as FileJpg, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';

const JpgToSvg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [svgUrl, setSvgUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setSvgUrl('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
    }
  }, []);

  const handleConvert = useCallback(() => {
    if (!selectedFile || !imagePreview) {
      toast({
        title: "No image selected",
        description: "Please select a JPG image to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    try {
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <image xlink:href="${imagePreview}" width="100" height="100" />
        </svg>
      `;
      
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      setSvgUrl(url);
      
      toast({
        title: "Basic conversion completed",
        description: "Note: This is a simple embedding of the JPG in an SVG container, not true vectorization.",
      });
    } catch (error) {
      console.error("JPG to SVG conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, imagePreview, toast]);

  const handleDownload = useCallback(() => {
    if (!svgUrl || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `${selectedFile.name.replace(/\.(jpg|jpeg|png)$/i, '')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(svgUrl);
  }, [svgUrl, selectedFile]);

  return (
    <>
      <Helmet>
        <title>JPG to SVG Converter - Convert JPG to SVG Online | ConvertMaster</title>
        <meta name="description" content="Convert JPG and PNG images to SVG format for free. This tool embeds your raster image into an SVG container. Note: Not true vectorization. Use ConvertMaster for basic JPG to SVG conversion with unlimited file size." />
        <meta name="keywords" content="jpg to svg, convert jpg to svg, png to svg, image to svg, online jpg to svg converter, unlimited jpg to svg" />
        <link rel="canonical" href="https://yourwebsite.com/jpg-to-svg" />
      </Helmet>
      <div className="container mx-auto px-4 pt-32 pb-20">
        <ToolHeader
          title="JPG to SVG Converter"
          description="Convert your JPG images to scalable vector graphics (SVG) format for better scaling and editing capabilities. No file size limits for basic embedding."
          icon={FileJpg}
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8">
            <FileDropZone
              onFileSelect={handleFileSelect}
              acceptedFileTypes=".jpg,.jpeg,.png"
              maxFileSize={1000}
              fileTypeDescription="images (JPG, JPEG, PNG)"
            />
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium mb-1">Important Note</h3>
                <p className="text-xs text-muted-foreground">
                  True JPG to SVG vectorization requires complex image tracing algorithms. This online tool provides a basic conversion by embedding the JPG inside an SVG container. For professional vectorization, consider using specialized desktop software like Adobe Illustrator or Inkscape.
                </p>
              </div>
            </div>
          </div>
          
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Convert to SVG</h3>
              
              {imagePreview && (
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Image Preview</p>
                  <div className="aspect-video bg-background/50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleConvert} 
                disabled={isConverting}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  {isConverting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      Convert to SVG
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
          
          {svgUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Conversion Result</h3>
              
              <div className="bg-background/50 rounded-lg overflow-hidden mb-6 p-4 flex items-center justify-center">
                <img 
                  src={svgUrl} 
                  alt="Converted SVG" 
                  className="max-w-full h-auto max-h-[300px]"
                />
              </div>
              
              <Button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download SVG
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentJpgToSvg />
      </div>
    </>
  );
};

const SeoContentJpgToSvg = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Basic JPG to SVG Conversion Online</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          ConvertMaster provides a simple tool to <strong>convert JPG to SVG</strong> or <strong>PNG to SVG</strong> by embedding your raster image into an SVG wrapper. While this isn't true vectorization, it can be useful for specific scenarios where an SVG container is required. Our <strong>online JPG to SVG converter</strong> is free and supports large image files.
        </p>
        <p>
          This <strong>image to SVG</strong> tool is perfect for quickly wrapping your JPG or PNG files in an SVG format. Keywords like <strong>convert JPG to SVG online</strong>, <strong>PNG to SVG converter free</strong>, and <strong>embed JPG in SVG</strong> reflect the functionality. Please note that for genuine vector graphics from a raster image (which involves tracing paths), specialized software is recommended. ConvertMaster offers this embedding solution with <strong>unlimited JPG to SVG</strong> file size support for your convenience.
        </p>
        <p>
          Use our tool when you need to present a JPG or PNG within an SVG structure, perhaps for compatibility with certain systems or for specific web development needs. The process is entirely browser-based, ensuring your files remain private.
        </p>
      </div>
    </div>
  </section>
);

export default JpgToSvg;
