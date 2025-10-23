"use client"

import { useEffect, useState } from "react"

export function SubtleGlowingBlobs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob 1 */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          top: "10%",
          left: "10%",
          animation: "float1 20s ease-in-out infinite",
        }}
      />

      {/* Blob 2 */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-8 blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 100%)",
          top: "60%",
          right: "15%",
          animation: "float2 25s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />

      {/* Blob 3 */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-12 blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)",
          bottom: "20%",
          left: "20%",
          animation: "float3 30s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />

      {/* Blob 4 */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-9 blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 101, 101, 0.25) 0%, rgba(245, 101, 101, 0.06) 50%, transparent 100%)",
          top: "30%",
          right: "30%",
          animation: "float4 22s ease-in-out infinite",
          animationDelay: "-15s",
        }}
      />

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(20px, 10px) scale(1.05); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.08); }
          66% { transform: translate(15px, -25px) scale(0.95); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(20px, 15px) scale(1.12); }
          40% { transform: translate(-15px, -20px) scale(0.88); }
          60% { transform: translate(25px, -10px) scale(1.06); }
          80% { transform: translate(-10px, 25px) scale(0.94); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-20px, -15px) scale(1.1); }
          70% { transform: translate(18px, 22px) scale(0.92); }
        }
      `}</style>
    </div>
  )
}
