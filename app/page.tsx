"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, LinkIcon, Upload, Loader2, Twitter } from "lucide-react"
import { cn } from "@/lib/utils" // For conditional class names

export default function Component() {
  const [isArabic, setIsArabic] = useState(true) // Start with Arabic
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [linkInput, setLinkInput] = useState<string>("") // New state for link input

  const toggleLanguage = () => {
    setIsArabic((prev) => !prev)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        setUploadedFile(file)
        if (!selectedMediaType) {
          if (file.type.startsWith("image/")) setSelectedMediaType("image")
          else if (file.type.startsWith("video/")) setSelectedMediaType("video")
        }
      }
    },
    [selectedMediaType],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setUploadedFile(file)
      if (!selectedMediaType) {
        if (file.type.startsWith("image/")) setSelectedMediaType("image")
        else if (file.type.startsWith("video/")) setSelectedMediaType("video")
      }
    }
  }

  const handleUploaderClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAnalyze = () => {
    let canAnalyze = false
    if (selectedMediaType === "link") {
      canAnalyze = linkInput.trim().length > 0
    } else {
      canAnalyze = uploadedFile !== null
    }

    if (!canAnalyze) return

    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      // Pass selectedMediaType as a query parameter
      router.push(`/results?type=${selectedMediaType}`)
    }, 2000)
  }

  const mediaTypes = [
    { id: "image", label: isArabic ? "صورة" : "Image", icon: ImageIcon },
    { id: "video", label: isArabic ? "فيديو" : "Video", icon: Video },
    { id: "link", label: isArabic ? "رابط" : "Link", icon: LinkIcon },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black text-white font-sans p-4 relative">
      {/* Language Toggle Button */}
      <Button
        variant="ghost"
        onClick={toggleLanguage}
        className="absolute top-4 right-4 text-v0-green hover:bg-gray-800 transition-colors duration-300"
      >
        {isArabic ? "English" : "العربية"}
      </Button>

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-4 py-8">
        {/* Logo */}
        <div className="mb-12 text-5xl font-bold text-v0-green drop-shadow-lg">{isArabic ? "رَقيب" : "Raqeeb"}</div>

        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-8 text-center text-v0-green">
          {isArabic ? "اختر نوع التحليل" : "Choose Media Type"}
        </h2>

        {/* Media Type Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full max-w-2xl">
          {mediaTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ease-in-out group min-h-[120px]",
                "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
                "hover:from-gray-800 hover:to-gray-700 hover:scale-105",
                selectedMediaType === type.id ? "border-v0-green shadow-v0-green/50 shadow-lg" : "border-gray-700",
              )}
              onClick={() => setSelectedMediaType(type.id)}
            >
              <type.icon className="w-10 h-10 mb-3 text-v0-green group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg font-medium">{type.label}</span>
            </Button>
          ))}
        </div>

        {/* Drag-and-Drop Uploader */}
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full max-w-2xl h-64 border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ease-in-out cursor-pointer",
            "bg-gradient-to-br from-gray-900 to-gray-800",
            isDragging ? "border-v0-green scale-[1.02]" : "border-gray-700",
            selectedMediaType === "link" ? "hidden" : "",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploaderClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept={selectedMediaType === "image" ? "image/*" : selectedMediaType === "video" ? "video/*" : "*/*"}
          />
          {uploadedFile ? (
            <div className="flex flex-col items-center">
              <p className="text-lg text-v0-green font-medium mb-2">{isArabic ? "تم رفع الملف:" : "File uploaded:"}</p>
              <p className="text-md text-gray-300 break-all px-4">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500 mt-2">{isArabic ? "انقر لتغيير الملف" : "Click to change file"}</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mb-4 text-gray-500" />
              <p className="text-lg text-gray-400">{isArabic ? "ارفع الوسيط هنا" : "Upload your media here"}</p>
              <p className="text-sm text-gray-500 mt-2">
                {isArabic ? "أو اسحب وأفلت الملفات" : "or drag and drop files"}
              </p>
            </>
          )}
        </div>

        {/* Link Input (if link is selected) */}
        {selectedMediaType === "link" && (
          <div className="w-full max-w-2xl mb-8">
            <input
              type="url"
              placeholder={isArabic ? "أدخل الرابط هنا..." : "Enter link here..."}
              className="w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-900 text-white focus:border-v0-green focus:ring-1 focus:ring-v0-green transition-all duration-300"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
            />
          </div>
        )}

        {/* Analyze Button */}
        <Button
          className={cn(
            "mt-12 w-full max-w-xs h-16 text-2xl font-bold rounded-xl transition-all duration-300 ease-in-out",
            "bg-v0-green text-black hover:bg-v0-green/90",
            isAnalyzing ? "cursor-not-allowed opacity-70" : "",
          )}
          onClick={handleAnalyze}
          disabled={
            isAnalyzing ||
            !selectedMediaType ||
            (selectedMediaType === "link" && linkInput.trim().length === 0) ||
            (selectedMediaType !== "link" && uploadedFile === null)
          }
        >
          {isAnalyzing ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              {isArabic ? "جاري التحليل..." : "Analyzing..."}
            </span>
          ) : isArabic ? (
            "تحليل"
          ) : (
            "Analyze"
          )}
        </Button>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-gray-500 text-sm">
        <p className="mb-2">
          {isArabic ? "حقوق البرمجة © عبدالعزيز الرويلي" : "Programming Rights © Abdulaziz Al-Ruwaili"}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Twitter className="w-4 h-4 text-v0-green" />
          <a
            href="https://twitter.com/eb2uu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-v0-green hover:underline"
          >
            @eb2uu
          </a>
        </div>
      </footer>
    </div>
  )
}
