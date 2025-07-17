import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"], // Include weights you plan to use
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "Media Analysis Platform",
  description: "Analyze images, videos, audio, and links.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Default to Arabic (RTL) based on user's primary language in prompt
  const isArabic = true // This would typically come from a global state or context
  const dir = isArabic ? "rtl" : "ltr"

  return (
    <html lang={isArabic ? "ar" : "en"} dir={dir} suppressHydrationWarning>
      <body className={`${tajawal.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
