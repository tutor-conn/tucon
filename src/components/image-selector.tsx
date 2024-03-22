import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

interface ImageSelectorProps {
  selectedImage: string | ArrayBuffer | null;
  setSelectedImage: (value: string | ArrayBuffer | null) => void;
  className?: string;
}

export function ImageSelector({
  selectedImage,
  setSelectedImage,
  className,
}: ImageSelectorProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No File Selected");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
      // this check is already done by if(file), but typescript is complaining
      if (event.target.files) {
        let name: string = event.target.files[0].name;
        if (name.length > 38) {
          name = name.substring(0, 35) + "...";
        }
        setFileName(name);
      }
    } else {
      setSelectedImage(null);
      setFileName("No File Selected");
    }
  };

  const handleButtonClick = () => {
    // current will be null if the ref is not attached to an element
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className={className}>
      <div className="mx-auto block h-48 w-full">
        <Image
          src={(selectedImage as string) ?? "/default-profile.png"}
          alt="Profile Picture"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="w-full">
        <Button
          onClick={handleButtonClick}
          className="mx-auto my-2 block"
          type="button"
        >
          Choose a File
        </Button>
        <p className="mx-auto block overflow-hidden text-nowrap text-center text-xs">
          {fileName}
        </p>
      </div>

      <label htmlFor="profile-image-upload" className="hidden">
        Upload an Image
      </label>
      <input
        id="profile-image-upload"
        ref={fileInput}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
