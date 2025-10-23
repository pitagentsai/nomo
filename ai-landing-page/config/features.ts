// Feature flags for easy alpha/beta management
export const FEATURES = {
  // Set to false when alpha is ready to remove coming soon overlays
  SHOW_COMING_SOON_OVERLAY: true,
  
  // Individual page coming soon flags (for granular control)
  MARKETS_COMING_SOON: true,
  PREDICTIONS_COMING_SOON: true,
  
  // Other feature flags can be added here
  ENABLE_WALLET_CONNECTION: true,
  ENABLE_BETTING: false, // Will be enabled in alpha
} as const

// Helper function to check if coming soon overlay should be shown
export const shouldShowComingSoon = (page: 'markets' | 'predictions'): boolean => {
  if (!FEATURES.SHOW_COMING_SOON_OVERLAY) return false
  
  if (page === 'markets') return FEATURES.MARKETS_COMING_SOON
  if (page === 'predictions') return FEATURES.PREDICTIONS_COMING_SOON
  
  return false
}
