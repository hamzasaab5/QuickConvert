
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Merge, Download, RefreshCw, AlertTriangle, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';

const PdfMerge = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState('');
  const [isMerging, setIsMerging] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const newFiles = files.map(file => ({
        file,
        name: file.name,
        size: file.size,
      }));
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles].slice(0, 10)); 
      if (selectedFiles.length + newFiles.length > 10) {
        toast({
          title: "File limit reached",
          description: "You can merge up to 10 PDF files at a time for this demo.",
          variant: "destructive",
        });
      }
    }
  }, [selectedFiles.length, toast]);

  const handleMerge = useCallback(async () => {
    if (selectedFiles.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least two PDF files to merge.",
        variant: "destructive",
      });
      return;
    }

    setIsMerging(true);
    
    setTimeout(() => {
      setMergedPdfUrl("#DEMO_URL#"); 
      setIsMerging(false);
      toast({
        title: "PDF Merge Simulated",
        description: "This is a demonstration. Full PDF merging functionality is not yet implemented. No actual file was merged or is available for download.",
        duration: 5000,
      });
    }, 1500);

  }, [selectedFiles, toast]);

  const handleDownload = useCallback(() => {
    if (!mergedPdfUrl) return;
    toast({
      title: "Download Simulated",
      description: "In a full version, your merged PDF would download now. This is a demo.",
    });
  }, [mergedPdfUrl, toast]);

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <Helmet>
        <title>PDF Merge - Combine PDF Files Online | Quick Converter</title>
        <meta name="description" content="Merge multiple PDF files into a single document online for free with Quick Converter. Easy to use PDF combiner. (Demo)" />
        <meta name="keywords" content="pdf merge, combine pdf, merge pdf online, pdf combiner, join pdf files, free pdf merge, quick converter pdf" />
        <link rel="canonical" href="https://yourwebsite.com/pdf-merge" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="PDF Merge"
          description="Combine multiple PDF files into a single, organized document. This tool is currently a demonstration."
          icon={Merge}
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
              acceptedFileTypes=".pdf"
              maxFileSize={50} 
              maxFiles={10 - selectedFiles.length > 0 ? 10 - selectedFiles.length : 0}
              fileTypeDescription="PDF files (up to 10 for demo)"
            />
          </motion.div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium mb-1">Important: Demo Version</h3>
                <p className="text-xs text-muted-foreground">
                  This PDF Merge tool is currently for demonstration purposes only. It simulates the process of selecting files for merging.
                  Full PDF merging functionality, which involves combining multiple PDF documents into one, typically requires specialized libraries (like PDF-lib for client-side operations) or server-side processing. These advanced features are not implemented in this demo.
                </p>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Selected PDFs ({selectedFiles.length}/10)</h3>
              <ul className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                {selectedFiles.map((fileData, index) => (
                  <li key={index} className="flex items-center justify-between bg-background/50 p-3 rounded-md text-sm">
                    <span className="truncate">{fileData.name} ({(fileData.size / (1024*1024)).toFixed(2)} MB)</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                      <FilePlus className="h-4 w-4 transform rotate-45" />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleMerge} 
                disabled={isMerging || selectedFiles.length < 2}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isMerging ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Merging...
                    </>
                  ) : (
                    <>
                      <Merge className="mr-2 h-4 w-4" />
                      Merge PDFs (Simulate)
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
          
          {mergedPdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Merged PDF Ready (Simulated)</h3>
              <p className="text-muted-foreground mb-4">Your PDF files have been virtually merged. In a full version, you could download the combined file now.</p>
              <Button 
                onClick={handleDownload}
                className="w-full relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Merged PDF (Simulated)
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          )}
        </div>
        <SeoContentPdfMerge />
      </motion.div>
    </>
  );
};

const SeoContentPdfMerge = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Combine Your PDFs with Ease</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Converter's <strong>PDF Merge</strong> tool (currently a demo) is designed to help you <strong>combine multiple PDF files</strong> into a single, cohesive document. Whether you're organizing reports, compiling research, or creating a portfolio, our <strong>online PDF combiner</strong> will make the process simple and efficient.
        </p>
        <p>
          Easily <strong>merge PDF online</strong> by uploading your files, arranging them in the desired order (feature to be added), and clicking a button. This tool is perfect for anyone needing to <strong>join PDF files</strong> without complex software. Keywords like <strong>free PDF merge</strong>, <strong>PDF joiner</strong>, and <strong>combine PDF documents</strong> highlight its utility. While this is a demonstration, a full version would securely process your files in the browser or via a secure server connection.
        </p>
        <p>
          Streamline your document management with Quick Converter. Our future <strong>PDF Merge</strong> tool will offer a fast, free, and reliable way to consolidate your PDF documents, saving you time and effort.
        </p>
      </div>
    </div>
  </section>
);

export default PdfMerge;
