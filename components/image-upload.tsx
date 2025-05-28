"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string | undefined) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange }) => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onImageChange(result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleFiles(e.target.files)
  }

  const removeImage = () => {
    onImageChange(undefined)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>Profile Photo (Optional)</Label>

      {currentImage ? (
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative rounded-lg overflow-hidden border-2 border-gray-200">
            <Image src={currentImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
          </div>
          <Button type="button" variant="outline" size="sm" className="mt-2 w-full" onClick={removeImage}>
            <X className="h-4 w-4 mr-2" />
            Remove Photo
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your professional headshot here, or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Recommended: Professional headshot, good lighting, business attire. Supports JPG, PNG files up to 5MB
          </p>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        </div>
      )}

      {!currentImage && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Photo Tips:</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use a professional headshot with good lighting</li>
            <li>• Face should be clearly visible and centered</li>
            <li>• Business or smart casual attire recommended</li>
            <li>• Avoid selfies, group photos, or casual pictures</li>
          </ul>
        </div>
      )}
    </div>
  )
}
