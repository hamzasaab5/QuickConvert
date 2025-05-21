
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const SelectedImageItem = ({ file, index, onRemoveFile }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group bg-background/50 rounded-lg overflow-hidden aspect-video flex items-center justify-center"
    >
      <img 
        src={file.preview} 
        alt={`Preview ${index + 1}`} 
        className="max-w-full max-h-full object-contain"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onRemoveFile(index)}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 px-2">
        <p className="text-xs text-white truncate">{file.name}</p>
      </div>
    </motion.div>
  );
};

const AddMoreImagesCard = ({ onClick, disabled }) => {
  return (
    <div 
      className={`border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-4 aspect-video transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary/10'}`}
      onClick={!disabled ? onClick : undefined}
    >
      <Plus className={`h-8 w-8 mb-2 ${disabled ? 'text-muted-foreground/50' : 'text-muted-foreground'}`} />
      <p className={`text-sm ${disabled ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>Add More Images</p>
    </div>
  );
};


const SelectedImagesGrid = ({ selectedFiles, onRemoveFile, onAddMore, canAddMore }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {selectedFiles.map((file, index) => (
        <SelectedImageItem 
          key={`${file.name}-${index}`} 
          file={file} 
          index={index} 
          onRemoveFile={onRemoveFile} 
        />
      ))}
      
      {canAddMore && (
         <AddMoreImagesCard onClick={onAddMore} disabled={!canAddMore} />
      )}
    </div>
  );
};

export default SelectedImagesGrid;
