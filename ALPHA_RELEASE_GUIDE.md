# Alpha Release Guide

## Coming Soon Overlay Management

When you're ready to release the alpha version, follow these simple steps to remove the "Coming Soon" overlays:

### Quick Release (Remove All Coming Soon Overlays)

1. Open `config/features.ts`
2. Change `SHOW_COMING_SOON_OVERLAY` from `true` to `false`
3. Save the file

```typescript
export const FEATURES = {
  // Set to false when alpha is ready to remove coming soon overlays
  SHOW_COMING_SOON_OVERLAY: false, // ← Change this to false
  // ... rest of config
}
```

### Granular Release (Enable Pages One by One)

If you want to enable pages individually:

1. Open `config/features.ts`
2. Set individual page flags to `false`:

```typescript
export const FEATURES = {
  SHOW_COMING_SOON_OVERLAY: true, // Keep this true for granular control
  MARKETS_COMING_SOON: false,     // ← Enable Markets page
  PREDICTIONS_COMING_SOON: false, // ← Enable Predictions page
  // ... rest of config
}
```

### Feature Flags Available

- `SHOW_COMING_SOON_OVERLAY`: Master switch for all coming soon overlays
- `MARKETS_COMING_SOON`: Controls Markets page overlay
- `PREDICTIONS_COMING_SOON`: Controls Predictions page overlay
- `ENABLE_WALLET_CONNECTION`: Controls wallet connection features
- `ENABLE_BETTING`: Controls betting functionality (currently disabled)

### What Happens When Disabled

- Coming soon overlays disappear immediately
- Pages become fully functional
- No code changes needed in components
- Easy to re-enable if needed

### Testing

After making changes:
1. Save the file
2. The changes take effect immediately (hot reload)
3. Navigate to `/markets` or `/predictions` to verify
4. Overlays should be gone and pages should be accessible
