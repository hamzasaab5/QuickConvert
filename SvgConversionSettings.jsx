
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RefreshCw, Settings } from 'lucide-react';

const SvgConversionSettings = ({ quality, scale, onQualityChange, onScaleChange, onConvert, isConverting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
    >
      <div className="flex items-center mb-4">
        <Settings className="h-5 w-5 mr-2" />
        <h3 className="text-xl font-semibold">Conversion Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Quality: {Math.round(quality)}%</span>
          </div>
          <Slider
            value={[quality]}
            onValueChange={(value) => onQualityChange(value[0])}
            min={10}
            max={100}
            step={1}
            className="py-4"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Scale: {scale}x</span>
          </div>
          <Slider
            value={[scale]}
            onValueChange={(value) => onScaleChange(value[0])}
            min={1}
            max={5}
            step={0.5}
            className="py-4"
          />
        </div>
        
        <Button 
          onClick={onConvert} 
          disabled={isConverting}
          className="w-full relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            {isConverting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                Convert SVG to JPG
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>
      </div>
    </motion.div>
  );
};

export default SvgConversionSettings;
