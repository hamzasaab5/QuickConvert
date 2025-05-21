
import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const PassportPhotoPreview = ({
  crop,
  setCrop,
  setCompletedCrop,
  aspect,
  imgRef,
  imagePreview,
  onImageLoad,
}) => {
  return (
    <div className="flex justify-center bg-background/50 p-2 rounded-lg mb-6">
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspect}
        minWidth={50}
        minHeight={50}
      >
        <img
          ref={imgRef}
          alt="Crop preview"
          src={imagePreview}
          onLoad={onImageLoad}
          style={{ maxHeight: '70vh', objectFit: 'contain' }}
        />
      </ReactCrop>
    </div>
  );
};

export default PassportPhotoPreview;
