"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, TrendingUp, TrendingDown } from "lucide-react"

interface BetModalProps {
  isOpen: boolean
  onClose: () => void
  market: {
    id: number
    title: string
    yesOdds: number
    noOdds: number
  }
  onBet: (marketId: number, position: boolean, amount: string) => Promise<void>
  isLoading?: boolean
}

export function BetModal({ isOpen, onClose, market, onBet, isLoading = false }: BetModalProps) {
  const [betAmount, setBetAmount] = useState("")
  const [selectedPosition, setSelectedPosition] = useState<boolean | null>(null)

  if (!isOpen) return null

  const handleBet = async () => {
    if (!selectedPosition || !betAmount || parseFloat(betAmount) <= 0) {
      alert("Please select a position and enter a valid bet amount")
      return
    }

    try {
      await onBet(market.id, selectedPosition, betAmount)
      setBetAmount("")
      setSelectedPosition(null)
      onClose()
    } catch (error) {
      console.error("Bet failed:", error)
    }
  }

  const calculatePayout = (amount: string, position: boolean) => {
    const betAmount = parseFloat(amount)
    if (betAmount <= 0) return "0.00"
    
    const odds = position ? market.yesOdds : market.noOdds
    const payout = betAmount / odds
    return payout.toFixed(4)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      <Card className="w-full max-w-md bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Place Your Bet</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Market Question */}
          <div className="mb-6">
            <p className="text-white/80 text-sm mb-2">Market:</p>
            <p className="text-white font-medium">{market.title}</p>
          </div>

          {/* Position Selection */}
          <div className="mb-6">
            <p className="text-white/80 text-sm mb-3">Choose your position:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedPosition(true)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPosition === true
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-white/20 hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">YES</span>
                </div>
                <div className="text-blue-400 text-sm">
                  {(market.yesOdds * 100).toFixed(1)}% odds
                </div>
              </button>

              <button
                onClick={() => setSelectedPosition(false)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPosition === false
                    ? 'border-pink-400 bg-pink-500/20'
                    : 'border-white/20 hover:border-pink-400/50'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-pink-400" />
                  <span className="text-white font-medium">NO</span>
                </div>
                <div className="text-pink-400 text-sm">
                  {(market.noOdds * 100).toFixed(1)}% odds
                </div>
              </button>
            </div>
          </div>

          {/* Bet Amount */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-2">
              Bet Amount (BNB):
            </label>
            <Input
              type="number"
              step="0.001"
              min="0"
              placeholder="0.001"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          {/* Payout Calculation */}
          {betAmount && selectedPosition !== null && (
            <div className="mb-6 p-3 bg-white/5 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Potential Payout:</span>
                <span className="text-white font-medium">
                  {calculatePayout(betAmount, selectedPosition)} BNB
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-white/60">Profit:</span>
                <span className="text-green-400 font-medium">
                  {(parseFloat(calculatePayout(betAmount, selectedPosition)) - parseFloat(betAmount)).toFixed(4)} BNB
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBet}
              disabled={!selectedPosition || !betAmount || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white"
            >
              {isLoading ? "Placing Bet..." : "Place Bet"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
