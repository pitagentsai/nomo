"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Smartphone, Monitor } from "lucide-react"

interface MetaMaskConnectPopupProps {
  isOpen: boolean
  onClose: () => void
  onConnected?: (account: string) => void
}

export function MetaMaskConnectPopup({ isOpen, onClose, onConnected }: MetaMaskConnectPopupProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"desktop" | "mobile">("desktop")

  if (!isOpen) return null

  const handleDownloadMetaMask = () => {
    window.open("https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank")
  }

  const handleDesktopConnect = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log("[NOMO] MetaMask connected:", accounts[0])
        onConnected?.(accounts[0])
        onClose()
      } else {
        alert("MetaMask not detected. Please install MetaMask extension.")
      }
    } catch (error) {
      console.error("[NOMO] MetaMask connection failed:", error)
      alert("Failed to connect to MetaMask. Please try again.")
    }
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
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        position: 'relative',
        width: '400px',
        maxWidth: '90vw',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <X size={20} />
        </button>

        {/* MetaMask Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: 'white', 
            margin: '0 0 8px 0' 
          }}>
            MetaMask
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '14px', 
            margin: 0 
          }}>
            Connect your wallet
          </p>
        </div>

        {/* Platform Selection */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setSelectedPlatform("desktop")}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              background: selectedPlatform === "desktop" ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: selectedPlatform === "desktop" ? 'white' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Monitor size={16} />
            Desktop
          </button>
          <button
            onClick={() => setSelectedPlatform("mobile")}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              background: selectedPlatform === "mobile" ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: selectedPlatform === "mobile" ? 'white' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Smartphone size={16} />
            Mobile
          </button>
        </div>

        {/* Content based on platform */}
        {selectedPlatform === "desktop" ? (
          <div>
            {/* Features */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6'
                  }} />
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Trusted by over 30 million users to buy, store, send and swap crypto securely
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6'
                  }} />
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  The leading crypto wallet & gateway to blockchain apps built on Ethereum Mainnet, Polygon, Optimism, and many other networks
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6'
                  }} />
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Puts you in control of your digital interactions by making power of cryptography more accessible
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleDesktopConnect}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
              >
                Connect MetaMask
              </button>
              <button
                onClick={handleDownloadMetaMask}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  const target = e.target as HTMLButtonElement
                  target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  const target = e.target as HTMLButtonElement
                  target.style.backgroundColor = 'transparent'
                  target.style.color = 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <Download size={16} />
                Install MetaMask Extension
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* QR Code Placeholder */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '192px',
                height: '192px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                <Smartphone size={48} style={{ marginBottom: '8px' }} />
                <div>QR Code</div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Scan to connect</div>
              </div>
            </div>

            {/* Mobile Instructions */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                Scan to connect and sign with
              </p>
              <button
                onClick={handleDownloadMetaMask}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                MetaMask mobile app
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadMetaMask}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
                onMouseOver={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                target.style.color = 'white'
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLButtonElement
                target.style.backgroundColor = 'transparent'
                target.style.color = 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <Download size={16} />
              Download MetaMask Mobile
            </button>
          </div>
        )}

        {/* SDK Version */}
        <div style={{
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '12px',
            margin: 0
          }}>
            SDK Version v0.33.1
          </p>
        </div>
      </div>
    </div>
  )
}