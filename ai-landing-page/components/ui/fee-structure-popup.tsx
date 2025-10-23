"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface FeeStructurePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function FeeStructurePopup({ isOpen, onClose }: FeeStructurePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? "bg-black/80 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Fee Structure</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Pre Migration */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Pre Migration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Token creator</span>
              <span className="text-white font-medium">1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Meteora</span>
              <span className="text-white font-medium">0.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Right.fun</span>
              <span className="text-white font-medium">0.6%</span>
            </div>
          </div>
        </div>

        {/* After Migration */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">After Migration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Token creator</span>
              <span className="text-white font-medium">1.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Token holders</span>
              <span className="text-white font-medium">0.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Meteora</span>
              <span className="text-white font-medium">0.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Right.fun</span>
              <span className="text-white font-medium">0.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
