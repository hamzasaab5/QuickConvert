
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import ImageToUrlForm from '@/components/image-to-url/ImageToUrlForm';
import ImageToUrlResult from '@/components/image-to-url/ImageToUrlResult';

const ImageToUrl = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setImageUrl('');
      
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
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to convert to URL.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target.result;
      setImageUrl(base64Url);
      setIsConverting(false);
      toast({
        title: "Image converted successfully",
        description: "Your image has been converted to a URL. You can now copy it.",
      });
    };
    reader.onerror = (error) => {
      console.error("File reading error:", error);
      setIsConverting(false);
      toast({
        title: "Conversion failed",
        description: "There was an error reading your image file. Please try again.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(selectedFile);
  }, [selectedFile, toast]);

  return (
    <>
      <Helmet>
        <title>Image to URL Converter - Get Base64 Data URL | Quick Converter</title>
        <meta name="description" content="Convert your images (JPG, PNG, GIF, WebP) to Base64 data URLs for free. Easily embed images in HTML, CSS, or share them with Quick Converter's unlimited image to URL tool." />
        <meta name="keywords" content="image to url, image to base64, data url generator, convert image to link, online image url converter, unlimited image to url" />
        <link rel="canonical" href="https://yourwebsite.com/image-to-url" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Image to URL Converter"
          description="Convert your images to data URLs for easy sharing and embedding in websites, emails, or documents. Supports large images for unlimited conversion."
          icon={Link2}
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
              acceptedFileTypes=".jpg,.jpeg,.png,.gif,.webp"
              maxFileSize={1000}
              fileTypeDescription="images (JPG, PNG, GIF, WebP)"
            />
          </motion.div>
          
          {selectedFile && (
            <ImageToUrlForm
              imagePreview={imagePreview}
              isConverting={isConverting}
              onConvert={handleConvert}
            />
          )}
          
          {imageUrl && (
            <ImageToUrlResult
              imageUrl={imageUrl}
              selectedFileName={selectedFile ? selectedFile.name : "Image Preview"}
            />
          )}
        </div>
        <SeoContentImageToUrl />
      </motion.div>
    </>
  );
};

const SeoContentImageToUrl = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Convert Images to Data URLs Instantly</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Effortlessly <strong>convert image to URL</strong> with Quick Converter's free online tool. Our <strong>Image to URL Converter</strong> transforms your JPG, PNG, GIF, or WebP images into Base64 data URLs, perfect for embedding directly into HTML, CSS, or markdown. This method is ideal for developers and designers who want to reduce HTTP requests and improve website loading times by inlining images.
        </p>
        <p>
          Our tool acts as a powerful <strong>data URL generator</strong> and <strong>image to Base64 converter</strong>. Simply upload your image, and we'll provide you with a ready-to-use data URL. There are no limits on file size for this conversion, allowing you to handle even large images. Key phrases like <strong>convert image to link</strong>, <strong>online image URL converter</strong>, and <strong>Base64 image encoder</strong> highlight the utility of this tool for various web development and content creation tasks. Your files are processed locally in your browser, ensuring complete privacy.
        </p>
        <p>
          Use the generated data URL to embed images without needing to host them separately. This is particularly useful for small icons, logos, or when you need a quick way to share an image representation without an external file. Try our <strong>unlimited image to URL</strong> converter today for a fast, secure, and free solution.
        </p>
      </div>
    </div>
  </section>
);

export default ImageToUrl;
