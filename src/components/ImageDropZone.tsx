import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageDropZoneProps {
  onImageDrop: (file: File, preview: string) => void;
  preview: string | null;
  isAnalyzing: boolean;
}

const ImageDropZone = ({ onImageDrop, preview, isAnalyzing }: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => onImageDrop(file, reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onImageDrop]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => onImageDrop(file, reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onImageDrop]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
        ${isDragging ? "border-primary bg-primary/5 glow-danger scale-[1.02]" : "border-border hover:border-muted-foreground"}
        ${preview ? "aspect-video" : "aspect-video"}
        ${isAnalyzing ? "pointer-events-none opacity-70" : ""}
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
      {preview ? (
        <img src={preview} alt="Uploaded crowd" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            {isDragging ? (
              <ImageIcon className="w-8 h-8 text-primary" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium text-lg">
              {isDragging ? "Drop image here" : "Drop a crowd image"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              or click to browse • JPG, PNG, WebP
            </p>
          </div>
        </div>
      )}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-primary font-mono text-sm">ANALYZING...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
