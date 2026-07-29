"use client"

import { useCallback, useState } from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Upload, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onDrop: (files: File[]) => void
  accept?: Record<string, string[]>
  maxSize?: number
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export function FileUpload({
  onDrop,
  accept,
  maxSize = 5 * 1024 * 1024,
  className,
  children,
  disabled,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejections: any[]) => {
      setError(null)
      if (rejections.length > 0) {
        const rejection = rejections[0]
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File too large. Max size: ${Math.round(maxSize / 1024 / 1024)}MB`)
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("File type not supported")
        } else {
          setError(rejection.errors[0]?.message || "Upload failed")
        }
        return
      }
      onDrop(acceptedFiles)
    },
    [onDrop, maxSize],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    disabled,
    multiple: true,
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input {...getInputProps()} />
        {children || (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-sm text-primary">Drop files here...</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Drag & drop files here, or click to select</p>
                <p className="text-xs text-muted-foreground">
                  Max file size: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
