
import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Edit3, AlertTriangle, FileText, Type, Image as ImageIconLucide, RotateCcw, Trash2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';

const PdfEditor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleEditAction = useCallback((action) => {
    if (!selectedFile) {
      toast({
        title: "No PDF selected",
        description: "Please select a PDF file to demonstrate editing actions.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: `PDF Edit Action (${action}) Simulated`,
        description: "This is a demonstration. Full PDF editing functionality is complex and not yet implemented.",
        duration: 5000,
      });
    }, 1500);
  }, [selectedFile, toast]);

  const editActions = [
    { name: 'Add Text', icon: Type, action: 'Add Text' },
    { name: 'Add Image', icon: ImageIconLucide, action: 'Add Image' },
    { name: 'Annotate', icon: Edit3, action: 'Annotate' },
    { name: 'Rearrange Pages', icon: Layers, action: 'Rearrange Pages' },
    { name: 'Delete Pages', icon: Trash2, action: 'Delete Pages' },
    { name: 'Rotate Pages', icon: RotateCcw, action: 'Rotate Pages' },
  ];

  return (
    <>
      <Helmet>
        <title>PDF Editor - Edit PDF Files Online | Quick Converter</title>
        <meta name="description" content="Edit PDF files online for free with Quick Converter. Add text, images, shapes, and more. (Demo)" />
        <meta name="keywords" content="pdf editor, edit pdf, online pdf editor, free pdf editor, modify pdf, annotate pdf, quick converter pdf editor" />
        <link rel="canonical" href="https://yourwebsite.com/pdf-editor" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="PDF Editor"
          description="Basic PDF editing tools to annotate, add text, or make simple modifications. This tool is currently a demonstration."
          icon={Edit3}
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
              fileTypeDescription="PDF file"
            />
          </motion.div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium mb-1">Important: Demo Version</h3>
                <p className="text-xs text-muted-foreground">
                  This PDF Editor tool is currently for demonstration purposes only. It simulates the user interface for various editing actions.
                  Full PDF editing capabilities (such as actually adding text, images, annotations, rearranging pages, etc.) require sophisticated libraries (e.g., PDF-lib for client-side manipulation) or server-side solutions. These advanced features are not implemented in this demo.
                </p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Editing Options (Simulated)</h3>
              <div className="mb-6 p-4 bg-background/50 rounded-md flex items-center">
                <FileText className="h-6 w-6 mr-3 text-primary" />
                <span className="text-sm truncate">{selectedFile.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {editActions.map(item => (
                  <Button 
                    key={item.action} 
                    onClick={() => handleEditAction(item.action)} 
                    disabled={isProcessing} 
                    variant="outline"
                    className="flex items-center justify-start text-left"
                  >
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    {item.name}
                  </Button>
                ))}
              </div>
               {isProcessing && <p className="text-sm text-muted-foreground mt-4 text-center">Simulating action...</p>}
            </motion.div>
          )}
        </div>
        <SeoContentPdfEditor />
      </motion.div>
    </>
  );
};

const SeoContentPdfEditor = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Your PDFs Online</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Converter's <strong>PDF Editor</strong> (currently a demo) aims to provide a simple way to <strong>edit PDF files online</strong>. Whether you need to add text, insert images, annotate documents, or make other modifications, our tool will offer basic functionalities for quick edits without needing desktop software.
        </p>
        <p>
          An <strong>online PDF editor</strong> allows for convenient changes on the go. Keywords like <strong>free PDF editor</strong>, <strong>modify PDF online</strong>, and <strong>annotate PDF</strong> describe the intended capabilities. While this page demonstrates the concept, a full implementation would allow users to upload a PDF, perform various editing actions, and then download the modified file, all within a secure browser environment.
        </p>
        <p>
          Imagine quickly adding comments to a report, filling out a form, or highlighting important sections. Quick Converter's future <strong>PDF Editor</strong> will strive to make these common PDF editing tasks accessible and free for everyone.
        </p>
      </div>
    </div>
  </section>
);

export default PdfEditor;
