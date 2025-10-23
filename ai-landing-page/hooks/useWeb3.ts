"use client"

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES, CONTRACT_ABI, BSC_CONFIG } from '@/lib/contracts'

export interface Market {
  id: number
  question: string
  endTime: number
  totalLiquidity: string
  resolved: boolean
  outcome: boolean
  yesLiquidity: string
  noLiquidity: string
  yesOdds: number
  noOdds: number
}

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize Web3 connection - only called when user explicitly clicks connect
  const connectWallet = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!isClient) {
        throw new Error('Please wait for the page to load completely.')
      }

      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not detected. Please install MetaMask extension.')
      }

      // Only request account access when user explicitly clicks connect
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Check if we're on BSC
      const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as unknown as string
      if (parseInt(chainId, 16) !== BSC_CONFIG.chainId) {
        // Switch to BSC
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${BSC_CONFIG.chainId.toString(16)}` }],
        } as any)
      }

      // Create provider and contract instance
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PREDICTION_MARKET,
        CONTRACT_ABI,
        signer
      )

      setAccount(accounts[0])
      setProvider(provider)
      setContract(contract)
      setIsConnected(true)

    } catch (err: any) {
      setError(err.message)
      console.error('Wallet connection failed:', err)
      throw err // Re-throw so calling code can handle the error
    } finally {
      setIsLoading(false)
    }
  }

  // Create a new prediction market
  const createMarket = async (question: string, endTime: number) => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      setIsLoading(true)
      const tx = await contract.createMarket(question, endTime)
      await tx.wait()
      return tx.hash
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Add liquidity to a market
  const addLiquidity = async (marketId: number, position: boolean, amount: string) => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      setIsLoading(true)
      const value = ethers.parseEther(amount)
      const tx = await contract.addLiquidity(marketId, position, { value })
      await tx.wait()
      return tx.hash
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Claim winnings from a resolved market
  const claimWinnings = async (marketId: number) => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      setIsLoading(true)
      const tx = await contract.claimWinnings(marketId)
      await tx.wait()
      return tx.hash
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Get market data
  const getMarket = async (marketId: number): Promise<Market> => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      const market = await contract.markets(marketId)
      const yesLiquidity = await contract.getLiquidity(marketId, true)
      const noLiquidity = await contract.getLiquidity(marketId, false)
      
      const totalLiquidity = parseFloat(ethers.formatEther(market.totalLiquidity))
      const yesAmount = parseFloat(ethers.formatEther(yesLiquidity))
      const noAmount = parseFloat(ethers.formatEther(noLiquidity))
      
      const yesOdds = totalLiquidity > 0 ? noAmount / totalLiquidity : 0.5
      const noOdds = totalLiquidity > 0 ? yesAmount / totalLiquidity : 0.5

      return {
        id: marketId,
        question: market.question,
        endTime: Number(market.endTime),
        totalLiquidity: ethers.formatEther(market.totalLiquidity),
        resolved: market.resolved,
        outcome: market.outcome,
        yesLiquidity: ethers.formatEther(yesLiquidity),
        noLiquidity: ethers.formatEther(noLiquidity),
        yesOdds,
        noOdds
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  // Get all markets
  const getAllMarkets = async (): Promise<Market[]> => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      const marketCount = await contract.marketCount()
      const markets: Market[] = []
      
      for (let i = 0; i < Number(marketCount); i++) {
        const market = await getMarket(i)
        markets.push(market)
      }
      
      return markets
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  // No automatic wallet detection - only connect when user explicitly clicks connect button

  return {
    account,
    provider,
    contract,
    isConnected,
    isLoading,
    error,
    isClient,
    connectWallet,
    createMarket,
    addLiquidity,
    claimWinnings,
    getMarket,
    getAllMarkets
  }
}
