
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Check, ExternalLink } from 'lucide-react';

const ImageToUrlResult = ({ imageUrl, selectedFileName }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyUrl = useCallback(() => {
    if (!imageUrl) return;
    
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "URL copied to clipboard",
          description: "You can now paste it wherever you need.",
        });
        
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Clipboard copy error:", error);
        toast({
          title: "Copy failed",
          description: "There was an error copying the URL. Please try again.",
          variant: "destructive",
        });
      });
  }, [imageUrl, toast]);

  const handleOpenUrl = () => {
    if (!imageUrl) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<img src="${imageUrl}" alt="Image Preview" style="max-width: 100%; max-height: 100vh; margin: auto; display: block;">`);
      newWindow.document.title = selectedFileName;
    } else {
      toast({
        title: "Failed to open new tab",
        description: "Please ensure your browser allows pop-ups for this site.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold mb-4">Your Image URL</h3>
      
      <div className="bg-background/50 rounded-lg p-4 mb-6 overflow-auto max-h-40">
        <p className="text-xs text-muted-foreground break-all">
          {imageUrl}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleCopyUrl}
          className="flex-1 flex items-center justify-center relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleOpenUrl}
          className="flex-1 flex items-center justify-center"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open URL in New Tab
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <h4 className="text-sm font-medium mb-2">How to use this URL</h4>
        <ul className="text-xs text-muted-foreground space-y-2">
          <li>• In HTML: <code className="bg-background/50 px-1 py-0.5 rounded">&lt;img src="DATA_URL_HERE" /&gt;</code></li>
          <li>• In CSS: <code className="bg-background/50 px-1 py-0.5 rounded">background-image: url('DATA_URL_HERE');</code></li>
          <li>• In Markdown: <code className="bg-background/50 px-1 py-0.5 rounded">![alt text](DATA_URL_HERE)</code></li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ImageToUrlResult;
