"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MetaMaskConnectPopup } from "./metamask-connect-popup"
import { useLanguage } from "@/contexts/LanguageContext"

// Type declaration for MetaMask ONLY
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string }) => Promise<string[]>
    }
  }
}




interface NavbarProps {
  onPopupStateChange?: (isOpen: boolean) => void
  isConnected?: boolean
  walletAddress?: string | null
}

export function Navbar({ onPopupStateChange, isConnected = false, walletAddress = null }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  // Trigger navbar slide-down animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavbarVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleConnectClick = () => {
    if (isConnected) {
      // If already connected, show disconnect option or do nothing
      return
    }
    onPopupStateChange?.(true)
  }



  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full")
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const navLinksData = [
    { label: t('nav.markets'), href: "/markets" },
    { label: t('nav.predictions'), href: "/predictions" },
  ]

  const chineseButtonElement = (
    <button 
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto"
    >
      {language === 'en' ? t('nav.chinese') : t('nav.english')}
    </button>
  )


  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div
        className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-blue-400
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
      ></div>
      <button
        onClick={handleConnectClick}
        className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-blue-400 to-blue-600 rounded-full hover:from-blue-500 hover:to-blue-700 transition-all duration-200 w-full sm:w-auto"
      >
        {isConnected ? `${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}` : t('home.connect')}
      </button>
    </div>
  )

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-opacity duration-500 ease-out
                       ${isNavbarVisible 
                         ? 'opacity-100' 
                         : 'opacity-0'
                       }`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          <button 
            onClick={() => {
              console.log('NOMO clicked - navigating to home')
              // Force navigation to home
              window.location.href = '/'
            }}
            className="text-white font-bold text-lg hover:text-blue-600 hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.7)] transition-all duration-300 cursor-pointer bg-transparent border-none p-0 hover:scale-105"
          >
            NOMO.
          </button>
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                console.log(`${link.label} button clicked - forcing navigation`)
                window.location.href = link.href
              }}
              className="text-gray-300 hover:text-white transition-colors duration-200 relative group bg-transparent border-none p-0 cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
          {/* X (Twitter) Logo */}
          <button
            onClick={() => window.open('https://x.com/nomopolybnb', '_blank')}
            className="text-gray-300 hover:text-white transition-colors duration-200 p-1 -ml-2"
            aria-label="Follow us on X (Twitter)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          
          {chineseButtonElement}
          {signupButtonElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12M6 12h12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                console.log(`Mobile: ${link.label} button clicked - forcing navigation`)
                window.location.href = link.href
              }}
              className="text-gray-300 hover:text-white transition-colors w-full text-center bg-transparent border-none p-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {/* X (Twitter) Logo - Mobile */}
          <button
            onClick={() => window.open('https://x.com/nomopolybnb', '_blank')}
            className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
            aria-label="Follow us on X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          
          {chineseButtonElement}
          {signupButtonElement}
        </div>
      </div>

    </header>
  )
}
