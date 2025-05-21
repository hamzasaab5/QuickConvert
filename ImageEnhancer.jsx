
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sparkles, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import ImageEnhancerControls from '@/components/image-enhancer/ImageEnhancerControls';
import ImageEnhancerPreview from '@/components/image-enhancer/ImageEnhancerPreview';
import AiInfoBox from '@/components/image-enhancer/AiInfoBox';

const ImageEnhancer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [enhancedImage, setEnhancedImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [filterString, setFilterString] = useState('');

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    setFilterString(`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`);
  }, [brightness, contrast, saturation]);

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setEnhancedImage('');
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
    }
  }, []);

  const applyEnhancementsToCanvas = useCallback(() => {
    if (!imageRef.current || !canvasRef.current || !imagePreview) return;

    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = filterString;
    ctx.drawImage(img, 0, 0);
    
    return canvas.toDataURL(selectedFile?.type || 'image/png');
  }, [filterString, imagePreview, selectedFile]);


  const handleApplyEnhancements = useCallback(() => {
    if (!selectedFile || !imageRef.current) {
      toast({ title: "No image selected", description: "Please select an image.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        const dataUrl = applyEnhancementsToCanvas();
        setEnhancedImage(dataUrl);
        toast({ title: "Enhancements Applied", description: "Visual adjustments previewed. Download to save." });
      } catch (error) {
        console.error("Error applying enhancements: ", error);
        toast({ title: "Error", description: "Could not apply enhancements.", variant: "destructive"});
      } finally {
        setIsProcessing(false);
      }
    }, 500); 
  }, [selectedFile, applyEnhancementsToCanvas, toast]);


  const handleDownload = useCallback(() => {
    if (!enhancedImage && !imagePreview) {
      toast({ title: "Nothing to download", description: "Please select and process an image first.", variant: "destructive" });
      return;
    }
    
    const finalImageToDownload = enhancedImage || applyEnhancementsToCanvas();
    if (!finalImageToDownload) {
        toast({ title: "Error generating image", description: "Could not generate image for download.", variant: "destructive" });
        return;
    }

    const link = document.createElement('a');
    const fileName = selectedFile ? `enhanced_${selectedFile.name}` : 'enhanced_image.png';
    link.download = fileName;
    link.href = finalImageToDownload;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: "Your enhanced image is downloading." });
  }, [enhancedImage, imagePreview, selectedFile, toast, applyEnhancementsToCanvas]);


  return (
    <>
      <Helmet>
        <title>Image Enhancer (Visual Adjustments) | Quick Convert</title>
        <meta name="description" content="Enhance your images by adjusting brightness, contrast, and saturation. Free online tool by Quick Convert for visual adjustments." />
        <meta name="keywords" content="image enhancer, photo editor, improve image quality, brightness, contrast, saturation, quick convert, visual adjustments" />
        <link rel="canonical" href="https://yourwebsite.com/image-enhancer" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Image Enhancer (Visual Adjustments)"
          description="Adjust brightness, contrast, and saturation of your images. This tool provides client-side visual adjustments. True AI enhancements often require server-side processing."
          icon={Sparkles}
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
              acceptedFileTypes=".jpg,.jpeg,.png,.webp"
              maxFileSize={1000}
              fileTypeDescription="images (JPG, PNG, WebP)"
            />
          </motion.div>

          <AiInfoBox 
            toolName="Image Enhancer" 
            libraryName="Client-Side Canvas API" 
            message="This tool uses your browser's Canvas API for basic visual adjustments like brightness, contrast, and saturation. Advanced AI-powered image enhancements (such as upscaling, deep noise reduction, or generative edits) typically rely on complex server-side models and processing, which are not part of this tool."
          />

          {selectedFile && imagePreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <ImageEnhancerControls
                brightness={brightness}
                setBrightness={setBrightness}
                contrast={contrast}
                setContrast={setContrast}
                saturation={saturation}
                setSaturation={setSaturation}
                onApplyEnhancements={handleApplyEnhancements}
                isProcessing={isProcessing}
              />
              <ImageEnhancerPreview 
                imagePreview={imagePreview} 
                filterString={filterString} 
                imageRef={imageRef} 
              />
            </motion.div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {(enhancedImage || imagePreview) && selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Download Enhanced Image</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {enhancedImage ? "Preview of enhancements applied. " : "Original image shown. "}
                Download to get the image with current adjustments.
              </p>
              <Button onClick={handleDownload} className="w-full" disabled={isProcessing}>
                <Download className="mr-2 h-4 w-4" />Download Image
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentImageEnhancer />
      </motion.div>
    </>
  );
};

const SeoContentImageEnhancer = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Enhance Your Images with Quick Convert</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Convert's <strong>Image Enhancer</strong> allows you to make basic visual adjustments to your photos, such as modifying <strong>brightness, contrast, and saturation</strong>. This free online tool helps you quickly fine-tune your images for better visual appeal directly in your browser.
        </p>
        <p>
          While this tool demonstrates client-side capabilities for common image adjustments, true <strong>AI image enhancement</strong> often involves more complex processes like AI upscaling, noise reduction, or object recognition, which typically require powerful server-side processing. Users looking for <strong>photo editor online free</strong> or <strong>improve image quality</strong> can use this tool for fundamental visual enhancements.
        </p>
        <p>
          Experiment with visual settings to see how you can improve your images. Quick Convert provides this simple interface for demonstrating image adjustments directly in your browser, ensuring your files are processed locally for privacy.
        </p>
      </div>
    </div>
  </section>
);

export default ImageEnhancer;
