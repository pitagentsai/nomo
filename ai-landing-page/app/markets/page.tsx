"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/ui/navbar"
import { MetaMaskConnectPopup } from "@/components/ui/metamask-connect-popup"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BetModal } from "@/components/ui/bet-modal"
import { TrendingUp, TrendingDown, Clock, Users, DollarSign } from "lucide-react"
import { useWeb3, type Market } from "@/hooks/useWeb3"
import { useLanguage } from "@/contexts/LanguageContext"
import { ComingSoonOverlay } from "@/components/ui/coming-soon-overlay"
import { shouldShowComingSoon } from "@/config/features"

export default function MarketsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isBetModalOpen, setIsBetModalOpen] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [markets, setMarkets] = useState<Market[]>([])
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true)

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

  // Load markets from blockchain
  useEffect(() => {
    const loadMarkets = async () => {
      if (isConnected) {
        try {
          setIsLoadingMarkets(true)
          const blockchainMarkets = await getAllMarkets()
          setMarkets(blockchainMarkets)
        } catch (error) {
          console.error("Failed to load markets:", error)
          // Fallback to mock data if blockchain fails
          setMarkets(mockBets as any)
        } finally {
          setIsLoadingMarkets(false)
        }
      } else {
        // Use mock data when not connected
        setMarkets(mockBets as any)
        setIsLoadingMarkets(false)
      }
    }

    loadMarkets()
  }, [isConnected, getAllMarkets])

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
      // Refresh markets after successful bet
      const updatedMarkets = await getAllMarkets()
      setMarkets(updatedMarkets)
    } catch (error) {
      console.error("Bet failed:", error)
      throw error
    }
  }

  const mockBets = [
    {
      id: 1,
      title: "Will AI achieve AGI by 2030?",
      description: "Artificial General Intelligence surpassing human cognitive abilities",
      category: "AI & Technology",
      yesOdds: 0.35,
      noOdds: 0.65,
      volume: "$2.4M",
      participants: 1847,
      endDate: "Dec 31, 2030",
      trending: "up"
    },
    {
      id: 2,
      title: "Will quantum computing break RSA encryption by 2028?",
      description: "Quantum computers capable of breaking current cryptographic standards",
      category: "Cybersecurity",
      yesOdds: 0.28,
      noOdds: 0.72,
      volume: "$1.8M",
      participants: 1203,
      endDate: "Dec 31, 2028",
      trending: "down"
    },
    {
      id: 3,
      title: "Will brain-computer interfaces reach consumer market by 2027?",
      description: "Neuralink or similar BCI technology available to general public",
      category: "Biotech",
      yesOdds: 0.42,
      noOdds: 0.58,
      volume: "$3.1M",
      participants: 2156,
      endDate: "Dec 31, 2027",
      trending: "up"
    },
    {
      id: 4,
      title: "Will fusion energy achieve net positive by 2035?",
      description: "Commercial fusion reactors producing more energy than consumed",
      category: "Energy",
      yesOdds: 0.31,
      noOdds: 0.69,
      volume: "$1.9M",
      participants: 1456,
      endDate: "Dec 31, 2035",
      trending: "up"
    },
    {
      id: 5,
      title: "Will autonomous vehicles dominate roads by 2032?",
      description: "Over 50% of vehicles on major highways are fully autonomous",
      category: "Transportation",
      yesOdds: 0.38,
      noOdds: 0.62,
      volume: "$2.7M",
      participants: 1923,
      endDate: "Dec 31, 2032",
      trending: "down"
    },
    {
      id: 6,
      title: "Will space tourism become mainstream by 2030?",
      description: "Regular commercial space flights available to general public",
      category: "Space",
      yesOdds: 0.45,
      noOdds: 0.55,
      volume: "$1.5M",
      participants: 987,
      endDate: "Dec 31, 2030",
      trending: "up"
    }
  ]

  return (
    <>
      {/* Background Content */}
      <div className={`min-h-screen bg-black relative overflow-hidden ${shouldShowComingSoon('markets') ? 'pointer-events-none' : ''}`}>
        {/* Animated Background Blobs - Stacked Flares */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stack 1 - Top Left */}
          <div className="absolute top-1/4 left-1/4">
            {/* Large Base Blob */}
            <div 
              className="absolute w-[300px] h-[240px] bg-gradient-to-br from-blue-700/20 to-blue-900/25 blur-3xl"
              style={{
                borderRadius: '85% 15% 90% 10% / 20% 80% 15% 85%',
                top: '-120px',
                left: '-150px',
                animation: 'lavaFlow1 120s ease-in-out infinite'
              }}
            ></div>
            {/* Medium Mid Blob */}
            <div 
              className="absolute w-[210px] h-[168px] bg-gradient-to-br from-blue-600/25 to-blue-800/30 blur-2xl"
              style={{
                borderRadius: '25% 75% 35% 65% / 70% 30% 85% 15%',
                top: '-105px',
                left: '-105px',
                animation: 'lavaFlow2 150s ease-in-out infinite'
              }}
            ></div>
            {/* Small Top Blob */}
            <div 
              className="absolute w-[120px] h-[96px] bg-gradient-to-br from-blue-500/30 to-blue-700/35 blur-xl"
              style={{
                borderRadius: '70% 30% 25% 75% / 45% 55% 80% 20%',
                top: '-60px',
                left: '-60px',
                animation: 'lavaFlow3 140s ease-in-out infinite'
              }}
            ></div>
          </div>

          {/* Stack 2 - Top Right */}
          <div className="absolute top-1/3 right-1/4">
            {/* Large Base Blob */}
            <div 
              className="absolute w-[270px] h-[210px] bg-gradient-to-br from-blue-800/15 to-indigo-900/20 blur-3xl"
              style={{
                borderRadius: '15% 85% 25% 75% / 80% 20% 90% 10%',
                top: '-105px',
                right: '-135px',
                animation: 'lavaFlow4 180s ease-in-out infinite'
              }}
            ></div>
            {/* Medium Mid Blob */}
            <div 
              className="absolute w-[180px] h-[144px] bg-gradient-to-br from-blue-700/20 to-blue-900/25 blur-2xl"
              style={{
                borderRadius: '90% 10% 75% 25% / 15% 85% 20% 80%',
                top: '-72px',
                right: '-90px',
                animation: 'lavaFlow1 160s ease-in-out infinite'
              }}
            ></div>
            {/* Small Top Blob */}
            <div 
              className="absolute w-[108px] h-[84px] bg-gradient-to-br from-blue-600/25 to-blue-800/30 blur-xl"
              style={{
                borderRadius: '40% 60% 15% 85% / 75% 25% 60% 40%',
                top: '-42px',
                right: '-54px',
                animation: 'lavaFlow2 200s ease-in-out infinite'
              }}
            ></div>
          </div>

          {/* Stack 3 - Bottom Center */}
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
            {/* Large Base Blob */}
            <div 
              className="absolute w-[240px] h-[192px] bg-gradient-to-br from-blue-600/18 to-blue-800/22 blur-3xl"
              style={{
                borderRadius: '80% 20% 10% 90% / 30% 70% 85% 15%',
                bottom: '-96px',
                left: '-120px',
                animation: 'lavaFlow3 140s ease-in-out infinite'
              }}
            ></div>
            {/* Medium Mid Blob */}
            <div 
              className="absolute w-[168px] h-[132px] bg-gradient-to-br from-blue-500/22 to-blue-700/28 blur-2xl"
              style={{
                borderRadius: '30% 70% 85% 15% / 60% 40% 25% 75%',
                bottom: '-66px',
                left: '-84px',
                animation: 'lavaFlow4 170s ease-in-out infinite'
              }}
            ></div>
            {/* Small Top Blob */}
            <div 
              className="absolute w-[96px] h-[72px] bg-gradient-to-br from-blue-400/28 to-blue-600/32 blur-xl"
              style={{
                borderRadius: '65% 35% 20% 80% / 90% 10% 70% 30%',
                bottom: '-36px',
                left: '-48px',
                animation: 'lavaFlow1 190s ease-in-out infinite'
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
          
          @keyframes lavaFlow2 {
            0%, 100% { 
              transform: translate(0, 0) scale(1) rotate(0deg);
              border-radius: 25% 75% 35% 65% / 70% 30% 85% 15%;
            }
            33% { 
              transform: translate(-25px, 30px) scale(1.3) rotate(120deg);
              border-radius: 90% 10% 20% 80% / 15% 85% 70% 30%;
            }
            66% { 
              transform: translate(35px, -15px) scale(0.7) rotate(240deg);
              border-radius: 15% 85% 80% 20% / 60% 40% 25% 75%;
            }
          }
          
          @keyframes lavaFlow3 {
            0%, 100% { 
              transform: translate(0, 0) scale(1) rotate(0deg);
              border-radius: 70% 30% 25% 75% / 45% 55% 80% 20%;
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
        <section className="pt-32 pb-12 px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              {t('markets.title')}
            </h1>
            <p className="text-xs text-neutral-300 max-w-lg mx-auto">
              {t('markets.subtitle')}
            </p>
          </div>
        </section>

        {/* Markets Grid */}
        <section className="px-6 pb-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBets.map((bet) => (
                <Card 
                  key={bet.id}
                  className="bg-blue-500/20 backdrop-blur-xl border border-blue-400/40 hover:border-blue-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-white bg-blue-400/20 px-2 py-1 rounded-full">
                            {bet.category}
                          </span>
                          <div className="flex items-center gap-1">
                            {bet.trending === "up" ? (
                              <TrendingUp className="w-4 h-4 text-white" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
                          {bet.title}
                        </h3>
                        <p className="text-sm text-white/80 mb-4">
                          {bet.description}
                        </p>
                      </div>
                    </div>

                    {/* Odds */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-800 border border-blue-400/40 rounded-lg p-3">
                        <div className="text-xs text-white mb-1">YES</div>
                        <div className="text-lg font-bold text-white">
                          {(bet.yesOdds * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500 to-pink-700 border border-pink-400/50 rounded-lg p-3">
                        <div className="text-xs text-white mb-1">NO</div>
                        <div className="text-lg font-bold text-white">
                          {(bet.noOdds * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                      <div className="flex items-center gap-1 text-white/80">
                        <DollarSign className="w-3 h-3" />
                        <span>{bet.volume}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <Users className="w-3 h-3" />
                        <span>{bet.participants}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80">
                        <Clock className="w-3 h-3" />
                        <span>{bet.endDate}</span>
                      </div>
                    </div>

           {/* Action Buttons */}
           <div className="grid grid-cols-2 gap-3">
             <Button 
               size="sm" 
               onClick={() => handleBetClick(bet)}
               className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-400 hover:to-blue-700 text-white border border-blue-400/40 hover:border-blue-300/60 transition-all duration-200"
             >
               Bet YES
             </Button>
             <Button 
               size="sm" 
               onClick={() => handleBetClick(bet)}
               className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white border border-pink-400/50 hover:border-pink-300/70 transition-all duration-200"
             >
               Bet NO
             </Button>
           </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Blur Overlay - Only appears when popup is open */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-40 transition-all duration-300"
          style={{
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '16px',
            borderRadius: '8px'
          }}
        />
      )}

      {/* Popup - Rendered above blurred content */}
      <MetaMaskConnectPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose}
        onConnected={handleMetaMaskConnected}
      />

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
      <ComingSoonOverlay isEnabled={shouldShowComingSoon('markets')} />
    </>
  )
}
