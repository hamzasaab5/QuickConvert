
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PdfConversionSettings = ({
  quality,
  setQuality,
  dpi,
  setDpi,
  imageFormat,
  setImageFormat,
  selectedFileName,
  onConvert,
  isConverting,
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Settings className="mr-2 h-6 w-6 text-primary" />
        Conversion Settings
      </h3>
      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="quality" className="text-sm font-medium">Quality: {quality}% (for JPG)</label>
          <Slider id="quality" value={[quality]} onValueChange={(val) => setQuality(val[0])} min={10} max={100} step={5} className="py-3" />
        </div>
        <div>
          <label htmlFor="dpi" className="text-sm font-medium">Resolution (DPI): {dpi}</label>
          <Select value={String(dpi)} onValueChange={(val) => setDpi(Number(val))}>
            <SelectTrigger id="dpi-select"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="72">72 DPI (Screen)</SelectItem>
              <SelectItem value="150">150 DPI (Standard)</SelectItem>
              <SelectItem value="300">300 DPI (High Quality)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="format" className="text-sm font-medium">Output Format:</label>
          <Select value={imageFormat} onValueChange={setImageFormat}>
            <SelectTrigger id="format-select"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Selected File: {selectedFileName}</p>
      </div>
      <Button onClick={onConvert} disabled={isConverting} className="w-full">
        {isConverting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing PDF...</>
        ) : (
          <><CheckCircle className="mr-2 h-4 w-4" />Convert PDF to Images</>
        )}
      </Button>
    </>
  );
};

export default PdfConversionSettings;
