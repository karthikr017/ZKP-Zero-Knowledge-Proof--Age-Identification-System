"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AgeVerificationVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Animation variables
    let animationFrameId: number
    let step = 0

    // Colors
    const colors = {
      user: "#3b82f6",
      service: "#10b981",
      birthdate: "#ef4444",
      proof: "#8b5cf6",
      background: "#f8fafc",
      text: "#1e293b",
    }

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const width = canvas.width
      const height = canvas.height

      // Draw user
      ctx.fillStyle = colors.user
      ctx.beginPath()
      ctx.arc(width * 0.25, height * 0.5, 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw service
      ctx.fillStyle = colors.service
      ctx.beginPath()
      ctx.arc(width * 0.75, height * 0.5, 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw labels
      ctx.fillStyle = colors.text
      ctx.font = "16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("User", width * 0.25, height * 0.5 + 50)
      ctx.fillText("Service", width * 0.75, height * 0.5 + 50)

      // Draw birthdate (only visible to user)
      if (step < 50) {
        ctx.fillStyle = colors.birthdate
        ctx.beginPath()
        ctx.arc(width * 0.25, height * 0.3, 15, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillText("Birthdate", width * 0.25, height * 0.3 - 20)
      }

      // Draw ZKP computation
      if (step >= 50 && step < 100) {
        ctx.fillStyle = colors.proof
        ctx.beginPath()
        ctx.arc(width * 0.25, height * 0.3, 15 + (step - 50) / 10, 0, Math.PI * 2)
        ctx.globalAlpha = 1 - (step - 50) / 50
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.fillText("Computing Proof", width * 0.25, height * 0.3 - 20)
      }

      // Animate proof transfer
      if (step >= 100) {
        const proofProgress = Math.min((step - 100) / 100, 1)
        const proofX = width * 0.25 + width * 0.5 * proofProgress
        const proofY = height * 0.5 - 50 * Math.sin(Math.PI * proofProgress)

        ctx.fillStyle = colors.proof
        ctx.beginPath()
        ctx.arc(proofX, proofY, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillText("Age Proof", proofX, proofY - 15)
      }

      // Draw verification check when proof arrives
      if (step >= 200) {
        ctx.strokeStyle = colors.service
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(width * 0.75 - 15, height * 0.5 - 15)
        ctx.lineTo(width * 0.75, height * 0.5)
        ctx.lineTo(width * 0.75 + 15, height * 0.5 - 20)
        ctx.stroke()

        ctx.fillStyle = colors.text
        ctx.fillText("Verified: 18+", width * 0.75, height * 0.3)
      }

      // Update animation step
      step = (step + 1) % 300
      if (step === 0) {
        // Pause briefly at the beginning
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(draw)
        }, 1000)
      } else {
        animationFrameId = requestAnimationFrame(draw)
      }
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Verification Process</CardTitle>
        <CardDescription>Visualizing how ZKP protects your birthdate while proving your age</CardDescription>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-64 rounded-md border" />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Your birthdate stays private while only the proof of age is shared
        </p>
      </CardContent>
    </Card>
  )
}
