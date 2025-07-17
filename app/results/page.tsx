"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Twitter } from "lucide-react"
import { useState } from "react"

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mediaType = searchParams.get("type") // Get the media type from query params
  const [isArabic, setIsArabic] = useState(true)

  const toggleLanguage = () => {
    setIsArabic((prev) => !prev)
  }

  // Placeholder for actual analysis data based on mediaType
  const getSimulatedAnalysis = (type: string | null) => {
    switch (type) {
      case "image":
        return {
          title: isArabic ? "تحليل الصورة (مثال توضيحي)" : "Image Analysis (Illustrative Example)",
          description: isArabic
            ? "هذه النتائج محاكاة. ستحتاج إلى دمج خدمة تحليل خلفية قوية لجلب المصدر الحقيقي والبيانات التفصيلية."
            : "These are simulated results. You will need to integrate a powerful backend analysis service to fetch true source and detailed data.",
          content: (
            <>
              <p className="text-lg text-gray-200 mb-2">
                {isArabic
                  ? "تم تحليل الصورة باستخدام EXIF و Hash. معلومات EXIF تشير إلى أنها التقطت بواسطة iPhone 14 Pro Max في لندن بتاريخ 2022-10-12."
                  : "Image analyzed using EXIF and Hash. EXIF data indicates it was captured by an iPhone 14 Pro Max in London on 2022-10-12."}
              </p>
              <p className="text-lg text-gray-200 mb-2">
                {isArabic
                  ? "تشابه البصمة الرقمية (باستخدام blockhash):"
                  : "Perceptual hash similarity (using blockhash):"}
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>
                  {isArabic ? "85% تطابق مع منشور على Reddit (/r/London)" : "85% match with post on Reddit (/r/London)"}
                </li>
                <li>
                  {isArabic
                    ? "78% تشابه مع دبوس Pinterest (المستخدم: @photo_world)"
                    : "78% similarity with Pinterest pin (user: @photo_world)"}
                </li>
              </ul>
              <p className="text-lg text-gray-200 mt-2">
                {isArabic
                  ? "تحليل النص (باستخدام tesseract.js): 'Welcome to London!'"
                  : "Text analysis (using tesseract.js): 'Welcome to London!'"}
              </p>
              <p className="text-lg text-gray-200 mt-2">
                {isArabic
                  ? "لم يتم العثور على مصدر نطاق دقيق، ولكن الأصل على الأرجح Reddit."
                  : "No exact domain source found, but origin likely Reddit."}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {isArabic
                  ? "المصدر الأصلي (مثال): https://www.reddit.com/r/London/comments/example-post"
                  : "Original Source (Example): https://www.reddit.com/r/London/comments/example-post"}
              </p>
            </>
          ),
        }
      case "video":
        return {
          title: isArabic ? "تحليل الفيديو (مثال توضيحي)" : "Video Analysis (Illustrative Example)",
          description: isArabic
            ? "هذه النتائج محاكاة. ستحتاج إلى دمج خدمة تحليل خلفية قوية لجلب المصدر الحقيقي والبيانات التفصيلية."
            : "These are simulated results. You will need to integrate a powerful backend analysis service to fetch true source and detailed data.",
          content: (
            <>
              <p className="text-lg text-gray-200 mb-2">
                {isArabic
                  ? "تم استخراج إطارات رئيسية (باستخدام ffmpeg.wasm) ومقارنتها. تشابه بصمة الفيديو:"
                  : "Key frames extracted (using ffmpeg.wasm) and compared. Video fingerprint similarity:"}
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>
                  {isArabic
                    ? "92% تطابق مع مقطع على YouTube (القناة: TravelVlogs)"
                    : "92% match with clip on YouTube (Channel: TravelVlogs)"}
                </li>
                <li>
                  {isArabic
                    ? "88% تشابه مع مقطع قصير على TikTok (المستخدم: @city_explorer)"
                    : "88% similarity with short clip on TikTok (user: @city_explorer)"}
                </li>
              </ul>
              <p className="text-lg text-gray-200 mt-2">
                {isArabic
                  ? "تحليل النص من الصوت (باستخدام whisper.cpp): 'This is a beautiful city view.'"
                  : "Text analysis from audio (using whisper.cpp): 'This is a beautiful city view.'"}
              </p>
              <p className="text-lg text-gray-200 mt-2">
                {isArabic
                  ? "المصدر الأصلي المحتمل: YouTube، تم إعادة استخدامه على TikTok."
                  : "Probable original source: YouTube, reused on TikTok."}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {isArabic
                  ? "المصدر الأصلي (مثال): https://www.youtube.com/watch?v=example-video-id"
                  : "Original Source (Example): https://www.youtube.com/watch?v=example-video-id"}
              </p>
            </>
          ),
        }
      case "link":
        return {
          title: isArabic ? "تحليل الرابط (مثال توضيحي)" : "Link Analysis (Illustrative Example)",
          description: isArabic
            ? "هذه النتائج محاكاة. ستحتاج إلى دمج خدمة تحليل خلفية قوية لجلب المصدر الحقيقي والبيانات التفصيلية."
            : "These are simulated results. You will need to integrate a powerful backend analysis service to fetch true source and detailed data.",
          content: (
            <>
              <p className="text-lg text-gray-200 mb-2">
                {isArabic
                  ? "تم تحليل الرابط (باستخدام link-preview-js). معلومات النطاق و WHOIS:"
                  : "Link analyzed (using link-preview-js). Domain and WHOIS information:"}
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>{isArabic ? "عنوان الصفحة: 'أخبار التكنولوجيا اليوم'" : "Page Title: 'Today's Tech News'"}</li>
                <li>
                  {isArabic ? "النطاق: example-news.com (مسجل في 2018)" : "Domain: example-news.com (registered 2018)"}
                </li>
                <li>{isArabic ? "لا توجد عمليات إعادة توجيه مشبوهة." : "No suspicious redirects detected."}</li>
              </ul>
              <p className="text-lg text-gray-200 mt-2">
                {isArabic
                  ? "المصدر الأصلي: https://www.example-news.com/article/latest-tech"
                  : "Original Source: https://www.example-news.com/article/latest-tech"}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {isArabic
                  ? "تفاصيل WHOIS (مثال): المسجل: Domain Registrar Inc., تاريخ الإنشاء: 2018-05-01"
                  : "WHOIS Details (Example): Registrar: Domain Registrar Inc., Creation Date: 2018-05-01"}
              </p>
            </>
          ),
        }
      default:
        return {
          title: isArabic ? "لا توجد نتائج تحليل" : "No Analysis Results",
          description: isArabic
            ? "يرجى العودة للصفحة الرئيسية واختيار نوع الوسيط للتحليل."
            : "Please go back to the home page and select a media type for analysis.",
          content: null,
        }
    }
  }

  const analysisData = getSimulatedAnalysis(mediaType)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans p-4 relative">
      {/* Language Toggle Button */}
      <Button
        variant="ghost"
        onClick={toggleLanguage}
        className="absolute top-4 right-4 text-v0-green hover:bg-gray-800 transition-colors duration-300"
      >
        {isArabic ? "English" : "العربية"}
      </Button>

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-v0-green text-center">{analysisData.title}</h1>
        <div className="w-full bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-700 text-left">
          <p className="text-xl text-gray-300 mb-4">{analysisData.description}</p>
          {analysisData.content}
        </div>
        <Button
          className="mt-12 flex items-center gap-2 bg-v0-green text-black hover:bg-v0-green/90 transition-colors duration-300"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-5 h-5" />
          {isArabic ? "العودة للصفحة الرئيسية" : "Back to Home"}
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
