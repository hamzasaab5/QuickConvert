
import React, { useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MoveHorizontal, Download, RefreshCw, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';

const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState('');
  const [targetHeight, setTargetHeight] = useState('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImageUrl, setResizedImageUrl] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const imgRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setResizedImageUrl('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setTargetWidth(String(img.width));
          setTargetHeight(String(img.height));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
      setOriginalWidth(0);
      setOriginalHeight(0);
    }
  }, []);

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10);
    setTargetWidth(isNaN(newWidth) ? '' : String(newWidth));
    if (maintainAspectRatio && originalWidth && originalHeight && !isNaN(newWidth) && newWidth > 0) {
      setTargetHeight(String(Math.round((newWidth / originalWidth) * originalHeight)));
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    setTargetHeight(isNaN(newHeight) ? '' : String(newHeight));
    if (maintainAspectRatio && originalWidth && originalHeight && !isNaN(newHeight) && newHeight > 0) {
      setTargetWidth(String(Math.round((newHeight / originalHeight) * originalWidth)));
    }
  };

  const handleAspectRatioToggle = () => {
    const newMaintainAspectRatio = !maintainAspectRatio;
    setMaintainAspectRatio(newMaintainAspectRatio);
    if (newMaintainAspectRatio && targetWidth && originalWidth && originalHeight) { 
        const currentTargetWidth = parseInt(targetWidth, 10);
        if (!isNaN(currentTargetWidth) && currentTargetWidth > 0) {
            setTargetHeight(String(Math.round((currentTargetWidth / originalWidth) * originalHeight)));
        }
    }
  };

  const handleResizeImage = useCallback(async () => {
    if (!selectedFile || !imgRef.current) {
      toast({ title: "No image selected", description: "Please select an image to resize.", variant: "destructive" });
      return;
    }
    const numTargetWidth = parseInt(targetWidth, 10);
    const numTargetHeight = parseInt(targetHeight, 10);

    if (isNaN(numTargetWidth) || isNaN(numTargetHeight) || numTargetWidth <= 0 || numTargetHeight <= 0) {
      toast({ title: "Invalid dimensions", description: "Please enter valid positive numbers for width and height.", variant: "destructive" });
      return;
    }

    setIsResizing(true);
    setResizedImageUrl('');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = numTargetWidth;
      canvas.height = numTargetHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgRef.current, 0, 0, numTargetWidth, numTargetHeight);
      
      const dataUrl = canvas.toDataURL(selectedFile.type || 'image/png');
      setResizedImageUrl(dataUrl);

      toast({ title: "Image Resized", description: "Your image has been successfully resized." });
    } catch (error) {
      console.error("Resize error:", error);
      toast({ title: "Resize Failed", description: "Could not resize image. Please try again.", variant: "destructive" });
    } finally {
      setIsResizing(false);
    }
  }, [selectedFile, targetWidth, targetHeight, toast]);

  const handleDownload = useCallback(() => {
    if (!resizedImageUrl || !selectedFile) {
      toast({ title: "No resized image", description: "Please resize an image first.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    const fileNameParts = selectedFile.name.split('.');
    const extension = fileNameParts.pop();
    const name = fileNameParts.join('.');
    link.download = `${name}_resized.${extension}`;
    link.href = resizedImageUrl;
    link.click();
    toast({ title: "Download Started", description: "Your resized image is downloading." });
  }, [resizedImageUrl, selectedFile, toast]);

  return (
    <>
      <Helmet>
        <title>Image Resizer - Resize Images Online | Quick Convert</title>
        <meta name="description" content="Resize your images (JPG, PNG, WebP) to specific dimensions or percentages online. Maintain aspect ratio. Free tool by Quick Convert." />
        <meta name="keywords" content="image resizer, resize image, photo resizer, online image resizer, change image dimensions, quick convert" />
        <link rel="canonical" href="https://yourwebsite.com/image-resizer" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Image Resizer"
          description="Easily resize your images to the perfect dimensions. Adjust width, height, and maintain aspect ratio."
          icon={MoveHorizontal}
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

          {selectedFile && imagePreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Resize Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input id="width" type="number" value={targetWidth} onChange={handleWidthChange} placeholder="e.g., 1920" className="mt-1"/>
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input id="height" type="number" value={targetHeight} onChange={handleHeightChange} placeholder="e.g., 1080" className="mt-1"/>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <Switch id="aspect-ratio" checked={maintainAspectRatio} onCheckedChange={handleAspectRatioToggle} />
                <Label htmlFor="aspect-ratio" className="flex items-center cursor-pointer">
                  {maintainAspectRatio ? <Lock className="mr-2 h-4 w-4" /> : <Unlock className="mr-2 h-4 w-4" />}
                  Maintain Aspect Ratio
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Original Dimensions: {originalWidth} x {originalHeight} px</p>
              
              <div className="mb-6 max-h-96 overflow-hidden rounded-lg border border-border bg-background/50 flex items-center justify-center">
                <img ref={imgRef} src={imagePreview} alt="Preview" className="max-w-full max-h-96 object-contain"/>
              </div>

              <Button onClick={handleResizeImage} disabled={isResizing} className="w-full">
                {isResizing ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Resizing...</> : "Resize Image"}
              </Button>
            </motion.div>
          )}

          {resizedImageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Resized Image</h3>
              <div className="mb-6 max-h-96 overflow-hidden rounded-lg border border-border bg-background/50 flex items-center justify-center">
                <img src={resizedImageUrl} alt="Resized Preview" className="max-w-full max-h-96 object-contain"/>
              </div>
              <p className="text-xs text-muted-foreground mb-4 text-center">New Dimensions: {targetWidth} x {targetHeight} px</p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />Download Resized Image
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentImageResizer />
      </motion.div>
    </>
  );
};

const SeoContentImageResizer = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Perfectly Resize Your Images</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Convert's <strong>Image Resizer</strong> tool allows you to <strong>resize images online</strong> with precision and ease. Whether you need to change image dimensions for social media, websites, or emails, our tool supports various formats like JPG, PNG, and WebP. You can specify exact pixel dimensions or resize by percentage while optionally maintaining the original aspect ratio.
        </p>
        <p>
          Users looking for a <strong>free photo resizer</strong> or a way to <strong>change image dimensions</strong> quickly will find this tool invaluable. Keywords like <strong>online image resizer</strong>, <strong>resize JPG</strong>, <strong>PNG resizer</strong>, and <strong>crop image online</strong> (though this tool primarily focuses on resizing) are relevant. Our resizer processes images directly in your browser, ensuring your files are not uploaded to a server.
        </p>
        <p>
          Get your images to the perfect size for any purpose. Quick Convert's Image Resizer is fast, free, and secure, helping you optimize your visual content effortlessly.
        </p>
      </div>
    </div>
  </section>
);

export default ImageResizer;
