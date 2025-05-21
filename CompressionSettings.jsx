
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RefreshCw } from 'lucide-react';

const CompressionSettings = ({ compressionLevel, setCompressionLevel, onCompress, isCompressing }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4">Compression Settings</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Quality Level: {compressionLevel}%</span>
          <span className="text-xs text-muted-foreground">
            {compressionLevel < 50 ? 'Lower quality, smaller file' : 'Higher quality, larger file'}
          </span>
        </div>
        <Slider
          value={[compressionLevel]}
          onValueChange={(value) => setCompressionLevel(value[0])}
          min={10}
          max={100}
          step={1}
          className="py-4"
        />
      </div>
      
      <Button 
        onClick={onCompress} 
        disabled={isCompressing}
        className="w-full relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center">
          {isCompressing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Compressing...
            </>
          ) : (
            <>
              Compress Image
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Button>
    </motion.div>
  );
};

export default CompressionSettings;
