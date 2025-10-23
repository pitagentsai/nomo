"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/ui/navbar"
import { MetaMaskConnectPopup } from "@/components/ui/metamask-connect-popup"
import { Card } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/useWeb3"
import { useLanguage } from "@/contexts/LanguageContext"
import { ArrowLeft, TrendingUp, TrendingDown, Clock, DollarSign, Target, Zap } from "lucide-react"

export default function DocsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  
  const { account, isConnected, connectWallet } = useWeb3()
  const { t } = useLanguage()


  const handleMetaMaskConnected = (account: string) => {
    setIsPopupOpen(false)
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }

  const handleConnectClick = () => {
    if (isConnected) {
      return
    }
    setIsPopupOpen(true)
  }

  // Trigger navbar fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavbarVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Blobs - Same as homepage */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stack 1 - Top Left */}
        <div className="absolute top-1/4 left-1/4">
          <div 
            className="w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-full blur-3xl animate-lava-lamp"
            style={{
              animation: 'lavaLamp 20s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
        </div>

        {/* Stack 2 - Top Right */}
        <div className="absolute top-1/3 right-1/4">
          <div 
            className="w-80 h-80 bg-gradient-to-r from-blue-400/15 to-blue-500/8 rounded-full blur-3xl animate-lava-lamp"
            style={{
              animation: 'lavaLamp 25s ease-in-out infinite',
              animationDelay: '5s'
            }}
          />
        </div>

        {/* Stack 3 - Bottom Left */}
        <div className="absolute bottom-1/4 left-1/3">
          <div 
            className="w-72 h-72 bg-gradient-to-r from-blue-600/12 to-blue-700/6 rounded-full blur-3xl animate-lava-lamp"
            style={{
              animation: 'lavaLamp 30s ease-in-out infinite',
              animationDelay: '10s'
            }}
          />
        </div>

        {/* Stack 4 - Bottom Right */}
        <div className="absolute bottom-1/3 right-1/3">
          <div 
            className="w-88 h-88 bg-gradient-to-r from-blue-500/18 to-blue-600/9 rounded-full blur-3xl animate-lava-lamp"
            style={{
              animation: 'lavaLamp 22s ease-in-out infinite',
              animationDelay: '15s'
            }}
          />
        </div>
      </div>

      {/* Custom CSS for lava lamp animation */}
      <style jsx>{`
        @keyframes lavaLamp {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 15% 85% 25% 75% / 80% 20% 90% 10%;
          }
          25% { 
            transform: translate(-30px, 25px) scale(0.8) rotate(90deg);
            border-radius: 80% 20% 90% 10% / 25% 75% 15% 85%;
          }
          50% { 
            transform: translate(25px, -20px) scale(1.2) rotate(180deg);
            border-radius: 35% 65% 10% 90% / 85% 15% 70% 30%;
          }
          75% { 
            transform: translate(-15px, -35px) scale(0.9) rotate(270deg);
            border-radius: 90% 10% 75% 25% / 20% 80% 45% 55%;
          }
        }
      `}</style>

      {/* Navbar */}
      <Navbar 
        onPopupStateChange={setIsPopupOpen}
        isConnected={isConnected}
        walletAddress={account}
      />

      {/* MetaMask Connect Popup */}
      <MetaMaskConnectPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onConnected={handleMetaMaskConnected}
      />

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                {t('docs.title')}
              </span>
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              {t('docs.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            
            {/* How It Works */}
            <Card className="bg-gradient-to-br from-black/90 to-gray-900/85 backdrop-blur-xl border border-black/95 rounded-2xl p-8 hover:border-gray-900/98 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-900 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t('docs.howItWorks')}</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {t('docs.step1')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {t('docs.step2')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {t('docs.step3')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {t('docs.step4')}
                  </p>
                </div>
              </div>
            </Card>

            {/* Mechanics & Fees */}
            <Card className="bg-gradient-to-br from-black/90 to-gray-900/85 backdrop-blur-xl border border-black/95 rounded-2xl p-8 hover:border-gray-900/98 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-900 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t('docs.mechanics')}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🌐</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('docs.chain')}</p>
                      <p className="text-neutral-400 text-sm">BNB Chain</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('docs.round')}</p>
                      <p className="text-neutral-400 text-sm">~5 minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('docs.fee')}</p>
                      <p className="text-neutral-400 text-sm">3% of prize pool</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('docs.claim')}</p>
                      <p className="text-neutral-400 text-sm">{t('docs.claimDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payouts */}
            <Card className="bg-gradient-to-br from-black/90 to-gray-900/85 backdrop-blur-xl border border-black/95 rounded-2xl p-8 hover:border-gray-900/98 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-900 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t('docs.payouts')}</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/10 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">{t('docs.upPayout')}</p>
                  <p className="text-neutral-300 font-mono text-sm">(Total Pool ÷ UP Pool)</p>
                </div>
                
                <div className="bg-black/10 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">{t('docs.downPayout')}</p>
                  <p className="text-neutral-300 font-mono text-sm">(Total Pool ÷ DOWN Pool)</p>
                </div>
              </div>
            </Card>

            {/* Outcomes */}
            <Card className="bg-gradient-to-br from-black/90 to-gray-900/85 backdrop-blur-xl border border-black/95 rounded-2xl p-8 hover:border-gray-900/98 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-900 rounded-full flex items-center justify-center mr-4">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{t('docs.outcomes')}</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t('docs.win')}</p>
                    <p className="text-neutral-300 text-sm">{t('docs.winDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✗</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t('docs.lose')}</p>
                    <p className="text-neutral-300 text-sm">{t('docs.loseDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">=</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t('docs.tie')}</p>
                    <p className="text-neutral-300 text-sm">{t('docs.tieDesc')}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Back to Home Button */}
            <div className="text-center pt-8">
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-black to-gray-900 hover:from-gray-400 hover:to-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('docs.backToHome')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
