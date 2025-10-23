"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import { Navbar } from "@/components/ui/navbar"
import { MetaMaskConnectPopup } from "@/components/ui/metamask-connect-popup"
import { ArrowRight, CheckCircle, Clock, Target, Zap, Rocket, Brain, Globe, Smartphone, Layers, Cpu, Network, Users } from "lucide-react"
import Link from "next/link"
import { useWeb3 } from "@/hooks/useWeb3"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HomePage() {
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false)
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)
  const [visibleLetters, setVisibleLetters] = useState<number[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [roadmapItems, setRoadmapItems] = useState<boolean[]>(new Array(4).fill(false))
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false)
  
  const roadmapRef = useRef<HTMLDivElement>(null)
  const { account, isConnected, connectWallet } = useWeb3()
  const { t } = useLanguage()

  const handleMetaMaskConnected = (account: string) => {
    setIsPopupOpen(false)
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }

  // Scroll tracking and time-based roadmap animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(scrollTop / (documentHeight - windowHeight), 1)
      setScrollProgress(progress)
      
      // Prevent scroll-triggered navigation by stopping any potential navigation events
      if (progress > 0.95) {
        // Stop any potential navigation events that might be triggered by scrolling
        const event = new Event('scrollNavigationPrevented')
        window.dispatchEvent(event)
      }
      
      // Trigger time-based roadmap animation when roadmap comes into view
      if (roadmapRef.current) {
        const roadmapTop = roadmapRef.current.offsetTop
        const roadmapStart = roadmapTop - windowHeight * 0.6
        
        if (scrollTop >= roadmapStart && roadmapItems.every(item => !item)) {
          // Start time-based animation sequence
          const timeouts: NodeJS.Timeout[] = []
          
          // Progress bar appears first
          timeouts.push(setTimeout(() => {
            setIsProgressBarVisible(true)
          }, 0))
          
          // Popup 1 appears after 200ms
          timeouts.push(setTimeout(() => {
            setRoadmapItems(prev => prev.map((_, index) => index === 0))
          }, 200))
          
          // Popup 2 appears after 500ms
          timeouts.push(setTimeout(() => {
            setRoadmapItems(prev => prev.map((_, index) => index <= 1))
          }, 500))
          
          // Popup 3 appears after 800ms
          timeouts.push(setTimeout(() => {
            setRoadmapItems(prev => prev.map((_, index) => index <= 2))
          }, 800))
          
          // Popup 4 appears after 1100ms
          timeouts.push(setTimeout(() => {
            setRoadmapItems(prev => prev.map((_, index) => index <= 3))
          }, 1100))
          
          // Cleanup function
          return () => {
            timeouts.forEach(timeout => clearTimeout(timeout))
          }
        } else if (scrollTop < roadmapStart) {
          // Hide items when scrolling away from roadmap
          setRoadmapItems(new Array(4).fill(false))
          setIsProgressBarVisible(false)
        }
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [roadmapItems])

  // Mouse movement handler for parallax effect (throttled for performance)
  useEffect(() => {
    let animationFrame: number
    let lastTime = 0
    const throttleDelay = 16 // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= throttleDelay) {
        animationFrame = requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 2 - 1 // -1 to 1
          const y = (e.clientY / window.innerHeight) * 2 - 1 // -1 to 1
          setMousePosition({ x, y })
          lastTime = now
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    
    // Trigger title animation after component mounts
    const titleTimer = setTimeout(() => {
      setIsTitleVisible(true)
    }, 300)
    
    // Trigger subtitle animation after title
    const subtitleTimer = setTimeout(() => {
      setIsSubtitleVisible(true)
    }, 800)
    
    // Animate letters one by one for NOMO, then all at once for POLY
    const letters = ['N', 'O', 'M', 'O', ' ', 'P', 'O', 'L', 'Y']
    letters.forEach((_, index) => {
      if (index < 4) {
        // NOMO letters animate one by one
        setTimeout(() => {
          setVisibleLetters(prev => [...prev, index])
        }, 500 + (index * 150))
      } else if (index === 4) {
        // Space animates after NOMO
        setTimeout(() => {
          setVisibleLetters(prev => [...prev, index])
        }, 500 + (4 * 150))
      } else {
        // POLY letters all animate at the same time
        setTimeout(() => {
          setVisibleLetters(prev => [...prev, index])
        }, 500 + (4 * 150) + 200) // All POLY letters at same time: 200ms after space
      }
    })
    
    // Trigger buttons animation after all letters
    const buttonsTimer = setTimeout(() => {
      setIsButtonsVisible(true)
    }, 500 + (letters.length * 150) + 300) // After all letters + 300ms delay

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(buttonsTimer)
    }
  }, [])

  return (
    <div className="bg-black relative">
      {/* Animated Background Blobs - Stacked Flares - Fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stack 1 - Top Left */}
        <div className="absolute top-1/4 left-1/4">
          {/* Large Base Blob */}
          <div 
            className="absolute w-[300px] h-[240px] bg-gradient-to-br from-blue-700/15 to-blue-900/15 blur-[60px]"
            style={{
              borderRadius: '85% 15% 90% 10% / 20% 80% 15% 85%',
              top: '-120px',
              left: '-150px',
              animation: 'lavaFlow1 120s ease-in-out infinite',
              boxShadow: '0 0 100px rgba(59, 130, 246, 0.3), 0 0 200px rgba(37, 99, 235, 0.2)',
              transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Medium Mid Blob */}
          <div 
            className="absolute w-[210px] h-[168px] bg-gradient-to-br from-blue-600/15 to-blue-800/15 blur-[30px]"
            style={{
              borderRadius: '25% 75% 35% 65% / 70% 30% 85% 15%',
              top: '-105px',
              left: '-105px',
              animation: 'lavaFlow2 150s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Small Top Blob */}
          <div 
            className="absolute w-[120px] h-[96px] bg-gradient-to-br from-blue-500/15 to-blue-700/15 blur-[20px]"
            style={{
              borderRadius: '70% 30% 25% 75% / 45% 55% 80% 20%',
              top: '-60px',
              left: '-60px',
              animation: 'lavaFlow3 140s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
        </div>

        {/* Stack 2 - Top Right */}
        <div className="absolute top-1/3 right-1/6">
          {/* Large Base Blob */}
          <div 
            className="absolute w-[270px] h-[210px] bg-gradient-to-br from-blue-800/15 to-indigo-900/15 blur-[60px]"
            style={{
              borderRadius: '15% 85% 25% 75% / 80% 20% 90% 10%',
              top: '-105px',
              right: '-135px',
              animation: 'lavaFlow4 180s ease-in-out infinite',
              boxShadow: '0 0 120px rgba(30, 64, 175, 0.4), 0 0 250px rgba(67, 56, 202, 0.25)',
              transform: `translate3d(${mousePosition.x * -8}px, ${mousePosition.y * -8}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Medium Mid Blob */}
          <div 
            className="absolute w-[180px] h-[144px] bg-gradient-to-br from-blue-700/15 to-blue-900/15 blur-[30px]"
            style={{
              borderRadius: '90% 10% 75% 25% / 15% 85% 20% 80%',
              top: '-72px',
              right: '-90px',
              animation: 'lavaFlow1 160s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * -12}px, ${mousePosition.y * -12}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Small Top Blob */}
          <div 
            className="absolute w-[108px] h-[84px] bg-gradient-to-br from-blue-600/15 to-blue-800/15 blur-[20px]"
            style={{
              borderRadius: '40% 60% 15% 85% / 75% 25% 60% 40%',
              top: '-42px',
              right: '-54px',
              animation: 'lavaFlow2 200s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * -16}px, ${mousePosition.y * -16}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
        </div>

        {/* Stack 3 - Bottom Center */}
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
          {/* Large Base Blob */}
          <div 
            className="absolute w-[240px] h-[192px] bg-gradient-to-br from-blue-600/15 to-blue-800/15 blur-[60px]"
            style={{
              borderRadius: '80% 20% 10% 90% / 30% 70% 85% 15%',
              bottom: '-96px',
              left: '-120px',
              animation: 'lavaFlow3 140s ease-in-out infinite',
              boxShadow: '0 0 110px rgba(37, 99, 235, 0.35), 0 0 220px rgba(29, 78, 216, 0.2)',
              transform: `translate3d(${mousePosition.x * 6}px, ${mousePosition.y * 6}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Medium Mid Blob */}
          <div 
            className="absolute w-[168px] h-[132px] bg-gradient-to-br from-blue-500/15 to-blue-700/15 blur-[30px]"
            style={{
              borderRadius: '30% 70% 85% 15% / 60% 40% 25% 75%',
              bottom: '-66px',
              left: '-84px',
              animation: 'lavaFlow4 170s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * 9}px, ${mousePosition.y * 9}px, 0)`,
              willChange: 'transform'
            }}
          ></div>
          {/* Small Top Blob */}
          <div 
            className="absolute w-[96px] h-[72px] bg-gradient-to-br from-blue-400/15 to-blue-600/15 blur-[20px]"
            style={{
              borderRadius: '65% 35% 20% 80% / 90% 10% 70% 30%',
              bottom: '-36px',
              left: '-48px',
              animation: 'lavaFlow1 190s ease-in-out infinite',
              transform: `translate3d(${mousePosition.x * 12}px, ${mousePosition.y * 12}px, 0)`,
              willChange: 'transform'
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
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(37, 99, 235, 0.6), 0 0 60px rgba(29, 78, 216, 0.4);
          }
          50% { 
            opacity: 0.8;
            box-shadow: 0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(37, 99, 235, 0.8), 0 0 90px rgba(29, 78, 216, 0.6);
          }
        }
      `}</style>
      <Navbar 
        onPopupStateChange={setIsPopupOpen}
        isConnected={isConnected}
        walletAddress={account}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent z-10">
        <div className="container mx-auto px-4">
          <Card className="w-full h-[500px] bg-transparent relative overflow-hidden border-none">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                 <h1 className="text-6xl md:text-7xl text-white mb-6 flex items-baseline flex-wrap">
                   {['N', 'O', 'M', 'O', '.'].map((letter, index) => (
                     <span
                       key={index}
                       className={`inline-block transition-all duration-500 ease-out font-bold ${
                         visibleLetters.includes(index)
                           ? 'opacity-100 transform translate-y-0'
                           : 'opacity-0 transform -translate-y-8'
                       }`}
                       style={{
                         transitionDelay: `${index * 150}ms`,
                         minWidth: 'fit-content',
                         maxWidth: 'fit-content',
                         overflow: 'visible'
                       }}
                     >
                       {letter}
                     </span>
                   ))}
                 </h1>
                <p className={`text-xl text-neutral-300 max-w-lg mb-8 transition-all duration-1000 ease-out ${
                  isSubtitleVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4'
                }`}>
                   {t('home.subtitle')}
                 </p>

                 <div 
                   className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out ${
                     isButtonsVisible 
                       ? 'opacity-100 transform translate-y-0' 
                       : 'opacity-0 transform translate-y-8'
                   }`}
                 >
                  <Link href="/markets">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 py-3 transition-all duration-300 hover:scale-105">
                      {t('home.startTrading')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                     className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                     {t('home.docs')}
                  </Button>
                </div>
              </div>

              {/* Right content */}
              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Spacer Section */}
      <section className="relative h-32 bg-transparent z-10"></section>

      {/* Roadmap Section */}
      <section 
        ref={roadmapRef}
        id="roadmap" 
        className="relative flex items-center justify-center bg-transparent z-10 py-20 pt-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{t('roadmap.title')}</span>
            </h2>
            <p className="text-sm text-neutral-300 max-w-2xl mx-auto">
              {t('roadmap.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Legend */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" 
                       style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}></div>
                  <span className="text-white font-medium">{t('roadmap.legend.completed')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  <span className="text-white font-medium">{t('roadmap.legend.development')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-500 to-gray-600"></div>
                  <span className="text-white font-medium">{t('roadmap.legend.planned')}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`mb-8 transition-all duration-1000 ease-out ${
              isProgressBarVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: '50%',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(37, 99, 235, 0.6), 0 0 60px rgba(29, 78, 216, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                ></div>
                {/* Glow overlay */}
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-blue-600/30 rounded-full blur-sm"
                  style={{
                    width: '50%'
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Start</span>
                <span>Roadmap Progress</span>
                <span>Complete</span>
              </div>
            </div>

            {/* Roadmap Horizontal Stack */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
              {[
                {
                  phase: "Phase 1",
                  title: t('roadmap.phase1.title'),
                  status: t('roadmap.phase1.status'),
                  statusColor: "completed",
                  features: [
                    t('roadmap.phase1.feature1'),
                    t('roadmap.phase1.feature2'),
                    t('roadmap.phase1.feature3'),
                    t('roadmap.phase1.feature4'),
                    t('roadmap.phase1.feature5')
                  ],
                  number: "01"
                },
                {
                  phase: "Phase 2", 
                  title: t('roadmap.phase2.title'),
                  status: t('roadmap.phase2.status'),
                  statusColor: "development",
                  features: [
                    t('roadmap.phase2.feature1'),
                    t('roadmap.phase2.feature2'),
                    t('roadmap.phase2.feature3'),
                    t('roadmap.phase2.feature4'),
                    t('roadmap.phase2.feature5')
                  ],
                  number: "02"
                },
                {
                  phase: "Phase 3",
                  title: t('roadmap.phase3.title'),
                  status: t('roadmap.phase3.status'),
                  statusColor: "planned",
                  features: [
                    t('roadmap.phase3.feature1'),
                    t('roadmap.phase3.feature2'),
                    t('roadmap.phase3.feature3'),
                    t('roadmap.phase3.feature4'),
                    t('roadmap.phase3.feature5')
                  ],
                  number: "03"
                },
                {
                  phase: "Phase 4",
                  title: t('roadmap.phase4.title'),
                  status: t('roadmap.phase4.status'),
                  statusColor: "planned",
                  features: [
                    t('roadmap.phase4.feature1'),
                    t('roadmap.phase4.feature2'),
                    t('roadmap.phase4.feature3'),
                    t('roadmap.phase4.feature4'),
                    t('roadmap.phase4.feature5')
                  ],
                  number: "04"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ease-out ${
                    roadmapItems[index] 
                      ? 'opacity-100 transform translate-y-0 scale-100' 
                      : 'opacity-0 transform translate-y-8 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  {/* Liquid Glass Popup */}
                  <div 
                    className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl group flex-1 h-96 flex flex-col ${
                      item.statusColor === 'completed' 
                        ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 hover:border-blue-500/50' 
                        : item.statusColor === 'development'
                        ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 hover:border-yellow-500/50'
                        : 'bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/30 hover:border-gray-500/50'
                    }`}
                    style={{
                      background: item.statusColor === 'completed' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))'
                        : item.statusColor === 'development'
                        ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(202, 138, 4, 0.05))'
                        : 'linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(75, 85, 99, 0.05))',
                      backdropFilter: 'blur(20px)',
                      border: item.statusColor === 'completed' 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : item.statusColor === 'development'
                        ? '1px solid rgba(234, 179, 8, 0.3)'
                        : '1px solid rgba(107, 114, 128, 0.3)',
                      boxShadow: item.statusColor === 'completed' 
                        ? '0 8px 32px rgba(59, 130, 246, 0.1)' 
                        : item.statusColor === 'development'
                        ? '0 8px 32px rgba(234, 179, 8, 0.1)'
                        : '0 8px 32px rgba(107, 114, 128, 0.1)'
                    }}
                  >
                    {/* Number */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      item.statusColor === 'completed' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : item.statusColor === 'development'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}
                    style={item.statusColor === 'completed' ? { boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' } : {}}>
                      <span className="text-white font-bold text-lg">
                        {item.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${
                          item.statusColor === 'completed' ? 'text-blue-400' 
                          : item.statusColor === 'development' ? 'text-yellow-400'
                          : 'text-gray-400'
                        }`}>
                          {item.phase}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.statusColor === 'completed' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : item.statusColor === 'development'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-bold group-hover:transition-colors duration-300 ${
                        item.statusColor === 'completed' 
                          ? 'text-white group-hover:text-blue-300' 
                          : item.statusColor === 'development'
                          ? 'text-white group-hover:text-yellow-300'
                          : 'text-white group-hover:text-gray-300'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {/* Features List */}
                      <div className="space-y-2 flex-1">
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-2">
                            <span className="text-green-400 text-xs mt-0.5 flex-shrink-0">✓</span>
                            <span className="text-xs text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{
                           background: item.statusColor === 'completed' 
                             ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                             : item.statusColor === 'development'
                             ? 'radial-gradient(circle at center, rgba(234, 179, 8, 0.1) 0%, transparent 70%)'
                             : 'radial-gradient(circle at center, rgba(107, 114, 128, 0.1) 0%, transparent 70%)'
                         }}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MetaMask Connect Popup */}
      <MetaMaskConnectPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose}
        onConnected={handleMetaMaskConnected}
      />

    </div>
  )
}
