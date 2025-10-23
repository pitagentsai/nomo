"use client"

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export const DynamicLangAttribute = () => {
  const { language } = useLanguage()

  useEffect(() => {
    // Update the HTML lang attribute based on current language
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  return null // This component doesn't render anything
}
