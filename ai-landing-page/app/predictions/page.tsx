"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/ui/navbar"
import { MetaMaskConnectPopup } from "@/components/ui/metamask-connect-popup"
import { BetModal } from "@/components/ui/bet-modal"
import { useWeb3 } from "@/hooks/useWeb3"
import { useLanguage } from "@/contexts/LanguageContext"
import { ComingSoonOverlay } from "@/components/ui/coming-soon-overlay"
import { shouldShowComingSoon } from "@/config/features"
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for binary prediction markets
const mockBinaryMarkets = [
  {
    id: 1,
    question: "Will BNB price be above $600 by end of week?",
    asset: "BNB",
    currentPrice: 585.50,
    targetPrice: 600,
    endTime: "2024-01-15T23:59:59Z",
    yesOdds: 0.65,
    noOdds: 0.35,
    totalVolume: 125000,
    participants: 1250
  },
  {
    id: 2,
    question: "Will BTC reach $50,000 by month end?",
    asset: "BTC",
    currentPrice: 47250.30,
    targetPrice: 50000,
    endTime: "2024-01-31T23:59:59Z",
    yesOdds: 0.42,
    noOdds: 0.58,
    totalVolume: 89000,
    participants: 890
  },
  {
    id: 3,
    question: "Will ETH break $3,000 this week?",
    asset: "ETH",
    currentPrice: 2890.75,
    targetPrice: 3000,
    endTime: "2024-01-15T23:59:59Z",
    yesOdds: 0.38,
    noOdds: 0.62,
    totalVolume: 156000,
    participants: 1560
  },
  {
    id: 4,
    question: "Will BNB outperform BTC this month?",
    asset: "BNB/BTC",
    currentPrice: 0.0124,
    targetPrice: 0.0130,
    endTime: "2024-01-31T23:59:59Z",
    yesOdds: 0.55,
    noOdds: 0.45,
    totalVolume: 78000,
    participants: 780
  },
  {
    id: 5,
    question: "Will ETH/BTC ratio exceed 0.065?",
    asset: "ETH/BTC",
    currentPrice: 0.0612,
    targetPrice: 0.065,
    endTime: "2024-01-20T23:59:59Z",
    yesOdds: 0.48,
    noOdds: 0.52,
    totalVolume: 95000,
    participants: 950
  },
  {
    id: 6,
    question: "Will BNB market cap exceed $100B?",
    asset: "BNB",
    currentPrice: 585.50,
    targetPrice: 100000000000,
    endTime: "2024-02-15T23:59:59Z",
    yesOdds: 0.33,
    noOdds: 0.67,
    totalVolume: 67000,
    participants: 670
  }
]

export default function PredictionsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isBetModalOpen, setIsBetModalOpen] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<any>(null)
  const [markets, setMarkets] = useState<any[]>([])
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const {
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    addLiquidity,
    getAllMarkets
  } = useWeb3()
  
  const { t } = useLanguage()

  const handleMetaMaskConnected = (account: string) => {
    setIsPopupOpen(false)
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }

  const handleBetClick = (market: any) => {
    if (!isConnected) {
      setIsPopupOpen(true)
      return
    }
    setSelectedMarket(market)
    setIsBetModalOpen(true)
  }

  const handlePlaceBet = async (marketId: number, position: boolean, amount: string) => {
    try {
      await addLiquidity(marketId, position, amount)
      console.log(`Bet placed: Market ${marketId}, Position: ${position ? 'YES' : 'NO'}, Amount: ${amount}`)
    } catch (error) {
      console.error('Failed to place bet:', error)
      throw error
    }
  }

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    requestAnimationFrame(() => {
      setCurrentSlide((prev) => (prev + 1) % markets.length)
      setTimeout(() => setIsTransitioning(false), 300)
    })
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    requestAnimationFrame(() => {
      setCurrentSlide((prev) => (prev - 1 + markets.length) % markets.length)
      setTimeout(() => setIsTransitioning(false), 300)
    })
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    requestAnimationFrame(() => {
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 300)
    })
  }

  useEffect(() => {
    const loadMarkets = async () => {
      if (isConnected) {
        try {
          setIsLoadingMarkets(true)
          const blockchainMarkets = await getAllMarkets()
          setMarkets(blockchainMarkets)
        } catch (error) {
          console.error("Failed to load markets:", error)
          setMarkets(mockBinaryMarkets)
        } finally {
          setIsLoadingMarkets(false)
        }
      } else {
        setMarkets(mockBinaryMarkets)
        setIsLoadingMarkets(false)
      }
    }
    loadMarkets()
  }, [isConnected, getAllMarkets])

  const formatPrice = (price: number) => {
    if (price > 1000) {
      return `$${price.toLocaleString()}`
    } else if (price > 1) {
      return `$${price.toFixed(2)}`
    } else {
      return price.toFixed(6)
    }
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(0)}K`
    } else {
      return `$${volume}`
    }
  }

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime()
    const end = new Date(endTime).getTime()
    const diff = end - now

    if (diff <= 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden ${shouldShowComingSoon('predictions') ? 'pointer-events-none' : ''}`}>
      {/* Animated Background Blobs - Same as homepage */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stack 1 - Top Left */}
        <div className="absolute top-1/4 left-1/4">
          <div 
            className="absolute w-[300px] h-[240px] bg-gradient-to-br from-blue-700/15 to-blue-900/15 blur-[60px]"
            style={{
              borderRadius: '85% 15% 90% 10% / 20% 80% 15% 85%',
              top: '-120px',
              left: '-150px',
              animation: 'lavaFlow1 120s ease-in-out infinite',
              boxShadow: '0 0 100px rgba(59, 130, 246, 0.3), 0 0 200px rgba(37, 99, 235, 0.2)',
            }}
          ></div>
        </div>

        {/* Stack 2 - Top Right */}
        <div className="absolute top-1/3 right-1/6">
          <div 
            className="absolute w-[270px] h-[210px] bg-gradient-to-br from-blue-800/15 to-indigo-900/15 blur-[60px]"
            style={{
              borderRadius: '15% 85% 25% 75% / 80% 20% 90% 10%',
              top: '-105px',
              right: '-135px',
              animation: 'lavaFlow4 180s ease-in-out infinite',
              boxShadow: '0 0 120px rgba(30, 64, 175, 0.4), 0 0 250px rgba(67, 56, 202, 0.25)',
            }}
          ></div>
        </div>

        {/* Stack 3 - Bottom Center */}
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
          <div 
            className="absolute w-[240px] h-[192px] bg-gradient-to-br from-blue-600/15 to-blue-800/15 blur-[60px]"
            style={{
              borderRadius: '80% 20% 10% 90% / 30% 70% 85% 15%',
              bottom: '-96px',
              left: '-120px',
              animation: 'lavaFlow3 140s ease-in-out infinite',
              boxShadow: '0 0 110px rgba(37, 99, 235, 0.35), 0 0 220px rgba(29, 78, 216, 0.2)',
            }}
          ></div>
        </div>
      </div>

      {/* Custom Lava Lamp Animations */}
      <style jsx>{`
        @keyframes lavaFlow1 {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 85% 15% 90% 10% / 20% 80% 15% 85%;
          }
          25% { 
            transform: translate(30px, -20px) scale(1.2) rotate(90deg);
            border-radius: 10% 90% 20% 80% / 85% 15% 90% 10%;
          }
          50% { 
            transform: translate(-20px, 40px) scale(0.8) rotate(180deg);
            border-radius: 75% 25% 15% 85% / 30% 70% 80% 20%;
          }
          75% { 
            transform: translate(40px, 20px) scale(1.15) rotate(270deg);
            border-radius: 25% 75% 80% 20% / 60% 40% 10% 90%;
          }
        }
        
        @keyframes lavaFlow3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
            border-radius: 80% 20% 10% 90% / 30% 70% 85% 15%;
          }
          50% { 
            transform: translate(20px, -30px) scale(1.25) rotate(180deg);
            border-radius: 20% 80% 85% 15% / 70% 30% 25% 75%;
          }
        }
        
        @keyframes lavaFlow4 {
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

      <Navbar 
        onPopupStateChange={setIsPopupOpen}
        isConnected={isConnected}
        walletAddress={account}
      />

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              {t('predictions.title')}
            </h1>
            <p className="text-xs text-neutral-300 max-w-lg mx-auto">
              {t('predictions.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Markets Carousel */}
      <div className="relative z-10 pb-20 pt-2">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {isLoadingMarkets ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded mb-3"></div>
                  <div className="flex justify-between mb-3">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-200" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 transition-transform duration-200" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-visible rounded-lg">
                <div 
                  className="flex transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ 
                    transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px'
                  }}
                >
                  {markets.map((market, index) => (
                    <div key={market.id} className="w-full flex-shrink-0 flex justify-center">
                      <div className={`transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        index === currentSlide 
                          ? 'scale-100 opacity-100' 
                          : index === (currentSlide - 1 + markets.length) % markets.length || index === (currentSlide + 1) % markets.length
                          ? 'scale-75 opacity-50'
                          : 'scale-0 opacity-0'
                      }`}
                      style={{ 
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                      }}>
                        <Card className="bg-blue-500/20 backdrop-blur-xl border border-blue-400/40 p-4 hover:border-blue-300/60 transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 max-w-sm group"
                        style={{ 
                          willChange: 'transform, box-shadow',
                          backfaceVisibility: 'hidden',
                          transformStyle: 'preserve-3d'
                        }}>
                          {/* Market Header */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-semibold text-sm">{market.asset}</span>
                            <span className="text-xs text-white bg-blue-400/20 px-2 py-1 rounded-full">
                              {getTimeRemaining(market.endTime)}
                            </span>
                          </div>

                          {/* Market Question */}
                          <h3 className="text-white font-medium mb-3 text-sm line-clamp-2 group-hover:text-blue-200 transition-colors">
                            {market.question}
                          </h3>

                          {/* Price Info */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className='text-gray-400'>{t('predictions.current')}</span>
                              <span className="text-white font-semibold">{formatPrice(market.currentPrice)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className='text-gray-400'>{t('predictions.target')}</span>
                              <span className="text-white font-semibold">{formatPrice(market.targetPrice)}</span>
                            </div>
                          </div>

                          {/* Market Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center">
                              <div className="text-xs text-gray-400">{t('predictions.volume')}</div>
                              <div className="text-white font-semibold text-sm">{formatVolume(market.totalVolume)}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-400">{t('predictions.users')}</div>
                              <div className="text-white font-semibold text-sm">{market.participants.toLocaleString()}</div>
                            </div>
                          </div>

                          {/* Betting Buttons */}
                          <div className="space-y-2">
                            {/* YES Button */}
                            <Button
                              onClick={() => handleBetClick(market)}
                              className="w-full bg-gradient-to-r from-blue-500 to-blue-800 border border-blue-400/40 text-white font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm hover:shadow-lg hover:shadow-blue-400/20"
                            >
                              <TrendingUp className="w-3 h-3" />
                              <span>{t('predictions.yes')} {(market.yesOdds * 100).toFixed(0)}%</span>
                            </Button>

                            {/* NO Button */}
                            <Button
                              onClick={() => handleBetClick(market)}
                              className="w-full bg-gradient-to-r from-pink-500 to-pink-700 border border-pink-400/50 text-white font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm hover:shadow-lg hover:shadow-pink-400/20"
                            >
                              <TrendingDown className="w-3 h-3" />
                              <span>{t('predictions.no')} {(market.noOdds * 100).toFixed(0)}%</span>
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              {markets.length > 1 && (
                <div className="flex justify-center mt-16 space-x-2">
                  {markets.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        index === currentSlide 
                          ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                          : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                      }`}
                      style={{ 
                        willChange: 'transform, background-color',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MetaMask Connect Popup */}
      <MetaMaskConnectPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose}
        onConnected={handleMetaMaskConnected}
      />

      {/* Bet Modal */}
      {selectedMarket && (
        <BetModal
          isOpen={isBetModalOpen}
          onClose={() => setIsBetModalOpen(false)}
          market={{
            id: selectedMarket.id,
            title: selectedMarket.question,
            yesOdds: selectedMarket.yesOdds,
            noOdds: selectedMarket.noOdds
          }}
          onBet={handlePlaceBet}
          isLoading={isLoading}
        />
      )}

      {/* Coming Soon Overlay */}
      <ComingSoonOverlay isEnabled={shouldShowComingSoon('predictions')} />
    </div>
  )
}
