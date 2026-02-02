"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Image from "next/image";

type ImageUploadProps = {
  onChange?: (file: File | null) => void;
  maxSize?: number; // em MB
  accept?: string;
  placeholder?: string;
  className?: string;
  value?: string;
};

export const ImageUpload = ({
  onChange,
  maxSize = 5,
  accept = "image/*",
  placeholder = "Clique para selecionar uma imagem",
  className,
  value,
  ...props
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPreviewUrl = previewUrl || value;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      toast.warning(`Arquivo muito grande. Máximo permitido: ${maxSize}MB`);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    onChange?.(file);
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);

    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300",
          "border-slate-300 dark:border-slate-600",
          "hover:border-blue-400 dark:hover:border-blue-500",
          "hover:bg-slate-50 dark:hover:bg-slate-800/50",
          currentPreviewUrl &&
            "border-solid border-green-400 dark:border-green-500",
        )}
      >
        {currentPreviewUrl ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <Image
                src={currentPreviewUrl}
                alt="Preview da imagem"
                className="max-w-full max-h-48 rounded-lg shadow-md"
                width={`${100}`}
                height={48}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                aria-label="Remover imagem"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </Button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clique para alterar a imagem
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ImageIcon
                className="h-6 w-6 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {placeholder}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                PNG, JPG, GIF até {maxSize}MB
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
              Selecionar imagem
            </Button>
          </div>
        )}
      </div>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Selecionar arquivo de imagem"
      />
    </div>
  );
};
