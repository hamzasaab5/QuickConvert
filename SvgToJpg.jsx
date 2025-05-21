
import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileVolume as FileVector } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import SvgConversionSettings from '@/components/svg-to-jpg/SvgConversionSettings';
import SvgConversionResult from '@/components/svg-to-jpg/SvgConversionResult';
import { convertSvgToJpg } from '@/lib/svgUtils';
import SvgPreview from '@/components/svg-to-jpg/SvgPreview';

const SvgToJpg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [jpgUrl, setJpgUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState(0.9);
  const [scale, setScale] = useState(2);
  const canvasRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setJpgUrl('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSvgContent(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setSelectedFile(null);
      setSvgContent('');
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile || !svgContent) {
      toast({
        title: "No SVG selected",
        description: "Please select an SVG file to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    try {
      const jpgDataUrl = await convertSvgToJpg(svgContent, canvasRef.current, scale, quality);
      setJpgUrl(jpgDataUrl);
      toast({
        title: "Conversion successful",
        description: "Your SVG has been converted to JPG.",
      });
    } catch (error) {
      console.error("SVG to JPG conversion error:", error);
      toast({
        title: "Conversion failed",
        description: error.message || "There was an error converting your SVG. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, svgContent, scale, quality, toast]);

  const handleDownload = useCallback(() => {
    if (!jpgUrl || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = jpgUrl;
    link.download = `${selectedFile.name.replace('.svg', '')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(jpgUrl);
  }, [jpgUrl, selectedFile]);

  const handleQualityChange = useCallback((value) => setQuality(value / 100), []);
  const handleScaleChange = useCallback((value) => setScale(value), []);

  return (
    <>
      <Helmet>
        <title>SVG to JPG Converter - Convert SVG to JPG Online | Quick Converter</title>
        <meta name="description" content="Convert SVG vector graphics to high-quality JPG images for free. Adjust quality and scale with Quick Converter's SVG to JPG tool. Unlimited file size support." />
        <meta name="keywords" content="svg to jpg, convert svg to jpg, svg converter, vector to raster, online svg to jpg, unlimited svg to jpg" />
        <link rel="canonical" href="https://yourwebsite.com/svg-to-jpg" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="SVG to JPG Converter"
          description="Convert your SVG vector graphics to JPG format for wider compatibility and use in various applications. No file size limits."
          icon={FileVector}
        />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
          >
            <FileDropZone
              onFileSelect={handleFileSelect}
              acceptedFileTypes=".svg"
              maxFileSize={1000}
              fileTypeDescription="SVG files"
            />
          </motion.div>
          
          {selectedFile && svgContent && (
            <SvgPreview svgContent={svgContent} />
          )}
          
          {selectedFile && (
            <SvgConversionSettings
              quality={quality * 100}
              scale={scale}
              onQualityChange={handleQualityChange}
              onScaleChange={handleScaleChange}
              onConvert={handleConvert}
              isConverting={isConverting}
            />
          )}
          
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          
          {jpgUrl && (
            <SvgConversionResult jpgUrl={jpgUrl} onDownload={handleDownload} />
          )}
        </div>
        <SeoContentSvgToJpg />
      </motion.div>
    </>
  );
};

const SeoContentSvgToJpg = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Seamless SVG to JPG Conversion</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Need to <strong>convert SVG to JPG</strong>? Quick Converter offers a free, fast, and reliable <strong>SVG to JPG converter</strong> online. Scalable Vector Graphics (SVG) are perfect for logos and illustrations that need to scale without quality loss, but sometimes you need a JPG for wider compatibility or specific use cases. Our tool makes this <strong>vector to raster</strong> conversion effortless.
        </p>
        <p>
          With our <strong>online SVG to JPG</strong> tool, you can easily transform your .svg files into high-quality .jpg images. Adjust the output quality and scale to meet your exact requirements. This <strong>SVG converter</strong> is ideal for web designers, graphic artists, and anyone needing to quickly switch formats. We support <strong>unlimited SVG to JPG</strong> conversion, meaning no restrictions on file size or number of conversions. All processing is done securely in your browser.
        </p>
        <p>
          Simply upload your SVG, customize settings if needed, and download your JPG. It's a straightforward solution for tasks like preparing images for social media, embedding in documents that don't support SVG, or when a raster format is preferred. Use Quick Converter for all your <strong>SVG to JPG online</strong> needs and experience hassle-free file transformation.
        </p>
      </div>
    </div>
  </section>
);

export default SvgToJpg;
