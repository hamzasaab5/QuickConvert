
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { UserSquare, Camera, Scissors, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ToolHeader from '@/components/ToolHeader';
import FileDropZone from '@/components/FileDropZone';
import { passportPhotoConfig, getPresetByName, convertToPixels } from '@/components/passport-photo/passportPhotoConfig.js';
import AiInfoBoxPassport from '@/components/passport-photo/AiInfoBoxPassport';
import PassportPhotoControls from '@/components/passport-photo/PassportPhotoControls';
import PassportPhotoPreview from '@/components/passport-photo/PassportPhotoPreview';
import PassportPhotoResult from '@/components/passport-photo/PassportPhotoResult';
import { centerAspectCrop } from '@/lib/cropUtils.js';

const PassportPhotoMaker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  
  const initialPreset = getPresetByName(passportPhotoConfig.defaultPresetName) || passportPhotoConfig.presets[0];
  const [selectedPresetName, setSelectedPresetName] = useState(initialPreset.name);
  const [aspect, setAspect] = useState(initialPreset.aspect);
  const [outputWidthPx, setOutputWidthPx] = useState(convertToPixels(initialPreset.width, initialPreset.unit, initialPreset.dpi));
  const [outputHeightPx, setOutputHeightPx] = useState(convertToPixels(initialPreset.height, initialPreset.unit, initialPreset.dpi));

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setCroppedImageUrl('');
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview('');
      setCrop(undefined);
      setCompletedCrop(null);
    }
  }, []);

  const onImageLoad = useCallback((e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    const currentPreset = getPresetByName(selectedPresetName);
    if (currentPreset) {
      setCrop(centerAspectCrop(width, height, currentPreset.aspect));
    }
  }, [selectedPresetName]);
  
  const handlePresetChange = useCallback((presetName) => {
    const preset = getPresetByName(presetName);
    if (preset) {
      setSelectedPresetName(presetName);
      setAspect(preset.aspect);
      setOutputWidthPx(convertToPixels(preset.width, preset.unit, preset.dpi));
      setOutputHeightPx(convertToPixels(preset.height, preset.unit, preset.dpi));
      if (imgRef.current && imagePreview) {
        setCrop(centerAspectCrop(imgRef.current.naturalWidth, imgRef.current.naturalHeight, preset.aspect));
      }
    }
  }, [imagePreview]);

  useEffect(() => {
    if (imagePreview && imgRef.current) {
        const preset = getPresetByName(selectedPresetName);
        if (preset) {
            setCrop(centerAspectCrop(imgRef.current.naturalWidth, imgRef.current.naturalHeight, preset.aspect));
        }
    }
  }, [imagePreview, selectedPresetName]);


  const handleCreatePassportPhoto = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      toast({ title: "Error", description: "Crop area or image not available. Please select an image and ensure it's loaded.", variant: "destructive" });
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    canvas.width = outputWidthPx;
    canvas.height = outputHeightPx;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast({ title: "Canvas Error", description: "Could not get canvas context.", variant: "destructive" });
      return;
    }
    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, outputWidthPx, outputHeightPx);

    const dataUrl = canvas.toDataURL(selectedFile?.type || 'image/jpeg', 0.95);
    setCroppedImageUrl(dataUrl);
    toast({ title: "Passport Photo Ready", description: "Your photo has been cropped to the selected dimensions." });

  }, [completedCrop, selectedFile, outputWidthPx, outputHeightPx, toast]);

  const handleDownload = useCallback(() => {
    if (!croppedImageUrl) {
      toast({ title: "Nothing to download", description: "Please create a passport photo first.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    link.download = `passport_photo_${selectedFile?.name?.split('.')[0] || 'image'}.jpg`;
    link.href = croppedImageUrl;
    link.click();
    toast({ title: "Download Started", description: "Your passport photo is downloading." });
  }, [croppedImageUrl, selectedFile, toast]);

  return (
    <>
      <Helmet>
        <title>Passport Photo Maker | Quick Convert</title>
        <meta name="description" content="Create passport, visa, or ID photos by cropping to standard sizes. Select presets for different countries. Free online tool by Quick Convert." />
        <meta name="keywords" content="passport photo maker, visa photo, id photo, crop image, photo dimensions, quick convert" />
        <link rel="canonical" href="https://yourwebsite.com/passport-photo-maker" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-20"
      >
        <ToolHeader
          title="Passport Photo Maker"
          description="Create perfectly sized photos for passports, visas, or IDs. Choose from common presets and adjust the crop. Client-side image cropping for your convenience."
          icon={UserSquare}
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
              acceptedFileTypes=".jpg,.jpeg,.png,.webp"
              maxFileSize={1000}
              fileTypeDescription="images (JPG, PNG, WebP)"
            />
          </motion.div>

          <AiInfoBoxPassport 
            toolName="Passport Photo Maker"
            message="This tool provides client-side image cropping to standard photo dimensions. Advanced AI features like automatic background replacement/validation, pose correction, or compliance checks for specific country requirements typically need server-side processing or specialized SDKs, which are not part of this tool."
          />

          {selectedFile && imagePreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center"><Settings className="mr-2 h-5 w-5 text-primary"/>Photo Settings</h3>
              <PassportPhotoControls
                selectedPresetName={selectedPresetName}
                onPresetChange={handlePresetChange}
                presets={passportPhotoConfig.presets}
              />

              <h3 className="text-xl font-semibold my-4 flex items-center"><Scissors className="mr-2 h-5 w-5 text-primary"/>Crop Your Photo</h3>
              <PassportPhotoPreview
                imagePreview={imagePreview}
                crop={crop}
                setCrop={setCrop}
                completedCrop={completedCrop}
                setCompletedCrop={setCompletedCrop}
                aspect={aspect}
                imgRef={imgRef}
                onImageLoad={onImageLoad}
              />
            </motion.div>
          )}
          
          <PassportPhotoResult
            croppedImageUrl={croppedImageUrl}
            previewCanvasRef={previewCanvasRef}
            outputWidthPx={outputWidthPx}
            outputHeightPx={outputHeightPx}
            onDownload={handleDownload}
            selectedPresetName={selectedPresetName}
            isPhotoCreated={!!croppedImageUrl}
            onCreatePhoto={handleCreatePassportPhoto}
            isImageSelected={!!imagePreview}
          />
        </div>
        <SeoContentPassportPhoto />
      </motion.div>
    </>
  );
};

const SeoContentPassportPhoto = () => (
  <section className="mt-12 py-8 bg-secondary/10 rounded-xl">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Your Passport Photos Easily</h2>
      <div className="space-y-4 text-muted-foreground text-sm">
        <p>
          Quick Convert's <strong>Passport Photo Maker</strong> helps you crop your images to standard passport, visa, or ID photo sizes. Select from various country presets or define custom dimensions. This tool provides an easy way to prepare photos for official documents by focusing on client-side cropping.
        </p>
        <p>
          Users searching for <strong>free passport photo online</strong>, <strong>ID photo maker</strong>, or <strong>crop photo for visa</strong> can use this tool for straightforward image cropping. Note that this tool does not include AI-driven compliance checks (e.g., background color validation, facial feature positioning) which are often required for official submissions and usually involve complex server-side processing or specialized software.
        </p>
        <p>
          Prepare your photos conveniently with Quick Convert. This tool allows you to adjust your image to meet common size requirements directly in your browser.
        </p>
      </div>
    </div>
  </section>
);

export default PassportPhotoMaker;
