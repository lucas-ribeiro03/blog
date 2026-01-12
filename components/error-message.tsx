"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorMessageProps = {
  message: string;
  onClose?: () => void;
  className?: string;
} & React.ComponentProps<"div">;

export const ErrorMessage = ({
  message,
  onClose,
  className,
  ...props
}: ErrorMessageProps) => {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200 ${
        className || ""
      }`}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-medium">Erro</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 shrink-0 cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-800 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-200"
          aria-label="Fechar mensagem de erro"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
};
