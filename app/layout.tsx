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
  title: "Raqeeb", // Updated title for PWA
  description: "A modern media analysis platform.", // Updated description for PWA
  generator: "v0.dev",
  manifest: "/manifest.json", // Link to manifest file
  themeColor: "#00ff99", // Theme color for PWA
  appleWebApp: {
    // Apple specific PWA settings
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Raqeeb",
    startupImage: [
      "/raqeeb-icon-512x512.png", // Placeholder for splash screen image
    ],
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isArabic = true
  const dir = isArabic ? "rtl" : "ltr"

  return (
    <html lang={isArabic ? "ar" : "en"} dir={dir} suppressHydrationWarning>
      <head>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${tajawal.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
