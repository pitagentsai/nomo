"use client"

import { Suspense, lazy, useRef } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const splineRef = useRef<any>(null)

  const onLoad = (splineApp: any) => {
    // Store the spline app reference
    splineRef.current = splineApp
    
    // Enable camera controls for interactive dragging and spinning
    if (splineApp) {
      // Access the camera and enable controls
      const camera = splineApp.camera
      if (camera) {
        // Enable camera controls for mouse/touch interaction
        camera.controls.enabled = true
        camera.controls.enableRotate = true
        camera.controls.enablePan = true
        camera.controls.enableZoom = true
        camera.controls.autoRotate = false
        
        console.log('Spline scene loaded with interactive camera controls enabled')
      }
    }
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/5 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <Spline 
        ref={splineRef}
        scene={scene} 
        className={className}
        style={{ cursor: 'grab' }}
        onLoad={onLoad}
      />
    </Suspense>
  )
}
