
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FileDropZone from '@/components/FileDropZone';
import { removeImageBackground } from '@/services/imglyService.jsx';
import BackgroundRemovalControls from '@/components/background-remover/BackgroundRemovalControls';
import ImagePreviewSection from '@/components/background-remover/ImagePreviewSection';
import ApiKeyInput from '@/components/background-remover/ApiKeyInput';

const BackgroundRemovalMain = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [resultPreview, setResultPreview] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setResultPreview('');
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
      setResultPreview('');
    }
  }, []);

  const handleRemoveBackground = useCallback(async () => {
    if (!selectedFile) {
      toast({ title: "No image selected", description: "Please select an image file first.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setResultPreview('');

    try {
      const resultUrl = await removeImageBackground(selectedFile, apiKey, toast, (key, current, total) => {
        console.log(`Progress for ${key}: ${current}/${total}`);
      });
      setResultPreview(resultUrl);
      toast({ title: "Background Removed!", description: "The background has been successfully removed." });
    } catch (error) {
      console.error("Background removal failed on page:", error);
      // Toasting is handled in imglyService, but you could add specific UI updates here if needed
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, apiKey, toast]);

  const handleDownload = useCallback(() => {
    if (!resultPreview) {
      toast({ title: "Nothing to download", description: "Please process an image first.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    const fileName = selectedFile ? `bg_removed_${selectedFile.name.split('.')[0]}.png` : 'background_removed_image.png';
    link.download = fileName;
    link.href = resultPreview;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: "Your image with removed background is downloading." });
  }, [resultPreview, selectedFile, toast]);

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
      >
        <FileDropZone
          onFileSelect={handleFileSelect}
          acceptedFileTypes=".jpg,.jpeg,.png,.webp"
          maxFileSize={25}
          fileTypeDescription="images (JPG, PNG, WebP)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
      >
        <ImagePreviewSection
          imagePreview={imagePreview}
          resultPreview={resultPreview}
          isProcessing={isProcessing}
        />
        <BackgroundRemovalControls
          isProcessing={isProcessing}
          imagePreview={imagePreview}
          resultPreview={resultPreview}
          onRemoveBackground={handleRemoveBackground}
          onDownload={handleDownload}
        />
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-700 dark:text-amber-300">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
            <div>
              <p className="font-semibold">Important Notes:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li><strong>Model Loading:</strong> The AI models (approx. 5-10MB) are downloaded on first use or if your browser cache is cleared. This is a one-time download per model version.</li>
                <li><strong>Processing Time:</strong> Background removal is computationally intensive. Larger files (especially over 10MB) may take significant time to process directly in your browser. Performance depends on your device and internet speed.</li>
                <li><strong>File Size Limit:</strong> Files up to 25MB are accepted. For optimal performance and stability with client-side processing, this limit is recommended. Larger files may lead to browser issues.</li>
                <li><strong>API Key:</strong> A default API key is provided for demonstration. For heavy usage or production, obtain your own API key from <a href="https://img.ly/docs/bsdk/web/getting-started/installation/#api-key" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-500">img.ly</a>.</li>
                 <li><strong>Troubleshooting:</strong> If you encounter issues, try clearing your browser cache, checking your internet connection, or using a different browser. Ensure no browser extensions are interfering.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BackgroundRemovalMain;
