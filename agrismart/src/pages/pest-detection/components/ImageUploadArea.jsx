import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadArea = ({ onImageUpload, isAnalyzing }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = e?.dataTransfer?.files;
    if (files && files?.[0]) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e?.target?.result);
        onImageUpload(file);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.setAttribute('capture', 'environment');
      fileInputRef?.current?.click();
    }
  };

  const handleGallerySelect = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.removeAttribute('capture');
      fileInputRef?.current?.click();
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="text-center mb-6">
        <Icon name="Camera" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-card-foreground mb-2">Upload Crop Image</h2>
        <p className="text-muted-foreground text-sm">
          Take a photo or upload an image of your crop for AI-powered pest detection
        </p>
      </div>

      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-agricultural ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Drag and drop your image here, or click to select
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              iconName="Camera"
              iconPosition="left"
              onClick={handleCameraCapture}
              className="flex-1 sm:flex-none"
            >
              Take Photo
            </Button>
            <Button
              variant="outline"
              iconName="Image"
              iconPosition="left"
              onClick={handleGallerySelect}
              className="flex-1 sm:flex-none"
            >
              Choose from Gallery
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={uploadedImage}
              alt="Uploaded crop image"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-2 bg-error text-error-foreground rounded-full hover:bg-error/90 transition-agricultural"
              aria-label="Remove image"
            >
              <Icon name="X" size={16} color="white" />
            </button>
          </div>
          
          {isAnalyzing && (
            <div className="flex items-center justify-center space-x-3 py-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={20} color="var(--color-primary)" />
              </div>
              <span className="text-muted-foreground">Analyzing image...</span>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Tips for better results:</p>
            <ul className="space-y-1 text-xs">
              <li>• Ensure good lighting and clear focus</li>
              <li>• Capture affected areas up close</li>
              <li>• Include surrounding healthy areas for comparison</li>
              <li>• Avoid shadows and reflections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadArea;