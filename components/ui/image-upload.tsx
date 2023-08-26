"use client";
import React from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (file: string) => void;
  onRemove: (file: string) => void;
  file: string[];
};

function ImageUpload({ disabled, onChange, onRemove, file }: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {file.map((file) => (
          <div
            key={file}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                size="icon"
                type="button"
                variant="destructive"
                onClick={() => onRemove(file)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={file} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xhuqbc6r">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              onClick={onClick}
              disabled={disabled}
              variant="secondary"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
