"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ComingSoonOverlayProps {
  isEnabled?: boolean
}

export const ComingSoonOverlay = ({ isEnabled = true }: ComingSoonOverlayProps) => {
  const { t } = useLanguage()

  if (!isEnabled) return null

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-auto">
      {/* Invisible overlay to block interactions with content behind */}
      <div className="absolute inset-0 pointer-events-auto" />
      
      <div className="relative bg-gradient-to-br from-blue-500/80 to-blue-600/70 backdrop-blur-xl border border-blue-400/70 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl pointer-events-auto">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-3">
          {t('comingSoon.title')}
        </h2>

        {/* Description */}
        <p className="text-white mb-6 leading-relaxed font-medium">
          {t('comingSoon.description')}
        </p>

        {/* Alpha Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/60 to-blue-600/60 border border-blue-400/70 rounded-full mb-6">
          <span className="text-blue-100 text-sm font-medium">
            {t('comingSoon.alpha')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Twitter Button */}
          <Button
            onClick={() => window.open('https://x.com/nomopolybnb', '_blank')}
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>{t('comingSoon.followTwitter')}</span>
          </Button>

          {/* Back to Home Button */}
          <Button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('comingSoon.backToHome')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
