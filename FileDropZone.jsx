
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FileDropZone = ({ 
  onFileSelect, 
  acceptedFileTypes = "*", 
  maxFileSize = 10, // in MB
  maxFiles = 1,
  fileTypeDescription = "files"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (acceptedFileTypes !== "*") {
      const fileType = file.type;
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const acceptedTypes = acceptedFileTypes.split(',').map(type => type.trim());
      
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.substring(1);
        }
        return fileType.includes(type);
      });

      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `Please upload ${fileTypeDescription} only. Accepted: ${acceptedFileTypes}`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size should not exceed ${maxFileSize}MB. Your file is ${(file.size / (1024*1024)).toFixed(2)}MB.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    
    if (newFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${maxFiles} file${maxFiles > 1 ? 's' : ''} at once.`,
        variant: "destructive",
      });
      return;
    }

    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
      onFileSelect(validFiles);
    } else if (newFiles.length > 0 && validFiles.length === 0) {
      setFiles([]);
      onFileSelect([]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = null; 
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileSelect(newFiles); 
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`drop-area rounded-lg p-8 text-center ${
          isDragging ? 'active' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={acceptedFileTypes}
          multiple={maxFiles > 1}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/10 p-4 rounded-full"
          >
            <Upload className="h-8 w-8 text-primary" />
          </motion.div>
          
          <h3 className="text-lg font-medium">
            Drag & drop your {fileTypeDescription} here
          </h3>
          
          <p className="text-muted-foreground text-sm">
            or
          </p>
          
          <Button 
            onClick={handleButtonClick}
            className="relative overflow-hidden group"
          >
            <span className="relative z-10">Browse Files</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Maximum file size: {maxFileSize}MB
            {maxFiles > 1 ? ` (up to ${maxFiles} files)` : ''}
          </p>
        </div>
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 space-y-2"
        >
          <h4 className="font-medium">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
                <div className="flex items-center overflow-hidden">
                  <span className="text-sm truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default FileDropZone;
