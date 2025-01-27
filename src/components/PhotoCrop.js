import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utility/cropUtils'; // Helper function for cropping

const PhotoCrop = ({ imageSrc, onCropComplete,setImageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div className="crop-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3} 
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        style={{
          width: "100%",
          height: "300px",
          position: "relative",
          marginBottom: "20px",
        }}
      />
        <div className="crop-controls">
        <button onClick={handleSave} >Crop & Save</button>
        <button onClick={() => setImageSrc({
            image:""
        })}>Cancel</button>
        </div>
    </div>
  );
};

export default PhotoCrop;