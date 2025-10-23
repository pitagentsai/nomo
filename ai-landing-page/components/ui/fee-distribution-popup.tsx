"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeeDistributionPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function FeeDistributionPopup({ isOpen, onClose }: FeeDistributionPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const feeData = [
    { label: "Token Creator", percentage: 60, color: "bg-blue-500" },
    { label: "Token Holders", percentage: 25, color: "bg-green-500" },
    { label: "Platform", percentage: 15, color: "bg-purple-500" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Fee Distribution</h2>
          <p className="text-gray-400 text-sm">How platform fees are distributed</p>
        </div>

        {/* Fee breakdown */}
        <div className="space-y-4">
          {feeData.map((item, index) => (
            <div
              key={item.label}
              className={`transform transition-all duration-500 ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-white font-bold">{item.percentage}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                  style={{
                    width: isOpen ? `${item.percentage}%` : "0%",
                    transitionDelay: `${index * 150 + 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-medium">Total</span>
            <span className="text-white font-bold">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
