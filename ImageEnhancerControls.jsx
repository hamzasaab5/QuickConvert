
import React from 'react';
import { Slider } from '@/components/ui/slider';

const ImageEnhancerControls = ({
  brightness, setBrightness,
  contrast, setContrast,
  saturation, setSaturation
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <label htmlFor="brightness" className="text-sm font-medium">Brightness: {brightness}%</label>
        <Slider id="brightness" value={[brightness]} onValueChange={(val) => setBrightness(val[0])} min={0} max={200} step={1} className="py-3" />
      </div>
      <div>
        <label htmlFor="contrast" className="text-sm font-medium">Contrast: {contrast}%</label>
        <Slider id="contrast" value={[contrast]} onValueChange={(val) => setContrast(val[0])} min={0} max={200} step={1} className="py-3" />
      </div>
      <div>
        <label htmlFor="saturation" className="text-sm font-medium">Saturation: {saturation}%</label>
        <Slider id="saturation" value={[saturation]} onValueChange={(val) => setSaturation(val[0])} min={0} max={200} step={1} className="py-3" />
      </div>
    </div>
  );
};

export default ImageEnhancerControls;
