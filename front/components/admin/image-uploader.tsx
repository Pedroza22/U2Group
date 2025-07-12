"use client"

import React, { useRef } from "react";

interface ImageUploaderProps {
  value?: string | File;
  onChange: (file: File | null) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onChange(file);
    } else {
      onChange(null);
    }
  };

  let previewUrl = "";
  if (value instanceof File) {
    previewUrl = URL.createObjectURL(value);
  } else if (typeof value === "string" && value) {
    previewUrl = value;
  }

  return (
    <div>
      {label && <label className="block text-sm neutra-font-bold text-gray-700 mb-2">{label}</label>}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="mb-2"
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Previsualización"
          className="w-32 h-32 object-cover rounded border"
        />
      )}
    </div>
  );
};

export default ImageUploader;
