
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileImage, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import CompressionSettings from '@/components/image-compressor/CompressionSettings';
import CompressionResults from '@/components/image-compressor/CompressionResults';
import { compressImage, formatBytes } from '@/lib/imageUtils';

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalPreview, setOriginalPreview] = useState('');
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedUrl('');
      setCompressedSize(0);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setOriginalPreview('');
      setOriginalSize(0);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to compress.",
        variant: "destructive",
      });
      return;
    }

    setIsCompressing(true);

    try {
      const { compressedFile: newCompressedFile, compressedUrl: newCompressedUrl } = await compressImage(selectedFile, compressionLevel);
      setCompressedUrl(newCompressedUrl);
      setCompressedSize(newCompressedFile.size);
      
      toast({
        title: "Image compressed successfully",
        description: `Reduced from ${formatBytes(originalSize)} to ${formatBytes(newCompressedFile.size)}`,
      });
    } catch (error) {
      console.error("Compression error:", error);
      toast({
        title: "Compression failed",
        description: error.message || "There was an error compressing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  }, [selectedFile, compressionLevel, originalSize, toast]);

  const handleDownload = useCallback(() => {
    if (!compressedUrl || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `compressed-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(compressedUrl); 
  }, [compressedUrl, selectedFile]);

  const handleCompressionLevelChange = useCallback((value) => {
    setCompressionLevel(value / 100);
  }, []);

  return (
    <>
      <Helmet>
        <title>Image Compressor - Compress JPG, PNG, WebP | ConvertMaster</title>
        <meta name="description" content="Compress JPG, PNG, and WebP images online for free. Reduce image file size without losing quality with ConvertMaster's Image Compressor tool. Unlimited file size compression." />
        <meta name="keywords" content="image compressor, compress jpg, compress png, compress webp, reduce image size, image optimizer, online image compression, unlimited image compressor" />
        <link rel="canonical" href="https://yourwebsite.com/image-compressor" />
      </Helmet>
      <div className="container mx-auto px-4 pt-32 pb-20">
        <ToolHeader
          title="Image Compressor"
          description="Compress your images without losing quality. Reduce file size for faster loading times and better performance. Supports large image files for unlimited compression."
          icon={FileImage}
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8">
            <FileDropZone
              onFileSelect={handleFileSelect}
              acceptedFileTypes=".jpg,.jpeg,.png,.webp"
              maxFileSize={1000} 
              fileTypeDescription="images (JPG, PNG, WebP)"
            />
          </div>
          
          {selectedFile && (
            <CompressionSettings
              compressionLevel={compressionLevel * 100}
              setCompressionLevel={handleCompressionLevelChange}
              onCompress={handleCompress}
              isCompressing={isCompressing}
            />
          )}
          
          {compressedUrl && selectedFile && (
            <CompressionResults
              originalPreview={originalPreview}
              originalSize={originalSize}
              compressedUrl={compressedUrl}
              compressedSize={compressedSize}
              onDownload={handleDownload}
              formatBytes={formatBytes}
            />
          )}
        </div>
        <SeoContentImageCompressor />
      </div>
    </>
  );
};

const SeoContentImageCompressor = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Master Image Compression with ConvertMaster</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Unlock the full potential of your website and digital projects with our powerful <strong>Image Compressor</strong>. At ConvertMaster, we provide a seamless, free online tool to <strong>compress JPG</strong>, <strong>compress PNG</strong>, and <strong>compress WebP</strong> images without compromising visual quality. Whether you're a web developer looking to speed up page load times, a marketer needing optimized images for campaigns, or simply someone wanting to save storage space, our tool is designed for you.
        </p>
        <p>
          Our <strong>image optimizer</strong> uses advanced algorithms to significantly <strong>reduce image file size</strong> while maintaining clarity and detail. With support for large files and unlimited compression, you can easily optimize high-resolution photos and graphics. The process is entirely client-side, meaning your images are processed in your browser, ensuring privacy and security. Keywords such as <strong>online image compression</strong>, <strong>photo size reducer</strong>, and <strong>image file shrinker</strong> perfectly describe the core functionality of our tool. Start compressing your images today and experience faster, more efficient digital content.
        </p>
        <p>
          Using ConvertMaster's <strong>image compressor</strong> is simple: upload your image, adjust the desired compression level, and download your optimized file. It's fast, free, and efficient, making it the ideal solution for all your image compression needs. Enhance your website's SEO, improve user experience with quicker loading images, and manage your digital assets more effectively with our reliable <strong>image compression tool</strong>.
        </p>
      </div>
    </div>
  </section>
);

export default ImageCompressor;
