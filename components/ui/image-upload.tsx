"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Image from "next/image";

type ImageUploadProps = {
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  onImageUrl: (url: string) => void;
  maxSize?: number; // em MB
  accept?: string;
  placeholder?: string;
  className?: string;
  value: string;
};

export const ImageUpload = ({
  onChange,
  onRemove,
  maxSize = 5,
  accept = "image/*",
  placeholder = "Clique para selecionar uma imagem",
  className,
  onImageUrl,
  value,
  ...props
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      toast.warning(`Arquivo muito grande. Máximo permitido: ${maxSize}MB`);
      return;
    }

    // Criar preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Gerar URL futura (baseada no nome do arquivo)
    const fileName = `${Date.now()}-${file.name}`;
    const futureUrl = `/uploads/${fileName}`;
    setGeneratedUrl(futureUrl);

    onChange?.(file);
    onImageUrl?.(futureUrl);
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setGeneratedUrl("");
    onImageUrl?.("");
    onChange?.(null);
    onRemove?.();
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
          previewUrl && "border-solid border-green-400 dark:border-green-500"
        )}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <Image
                src={previewUrl}
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

      {/* Campo URL readonly */}
      {generatedUrl && (
        <div className="space-y-2">
          <Label htmlFor="generated-url" className="text-sm font-medium">
            URL da Imagem
          </Label>
          <div className="flex gap-2">
            <Input
              id="generated-url"
              value={generatedUrl}
              readOnly
              className="bg-slate-50 dark:bg-slate-900 cursor-not-allowed"
              aria-label="URL gerada para a imagem"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => navigator.clipboard.writeText(generatedUrl)}
              title="Copiar URL"
              aria-label="Copiar URL da imagem"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </Button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Esta URL será usada para acessar a imagem após o upload
          </p>
        </div>
      )}
    </div>
  );
};
