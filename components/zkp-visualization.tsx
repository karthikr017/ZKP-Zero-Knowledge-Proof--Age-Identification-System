"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ZkpVisualization() {
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
      prover: "#3b82f6",
      verifier: "#10b981",
      secret: "#ef4444",
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

      // Draw prover
      ctx.fillStyle = colors.prover
      ctx.beginPath()
      ctx.arc(width * 0.25, height * 0.5, 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw verifier
      ctx.fillStyle = colors.verifier
      ctx.beginPath()
      ctx.arc(width * 0.75, height * 0.5, 30, 0, Math.PI * 2)
      ctx.fill()

      // Draw labels
      ctx.fillStyle = colors.text
      ctx.font = "16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Prover", width * 0.25, height * 0.5 + 50)
      ctx.fillText("Verifier", width * 0.75, height * 0.5 + 50)

      // Draw secret (only visible to prover)
      ctx.fillStyle = colors.secret
      ctx.beginPath()
      ctx.arc(width * 0.25, height * 0.3, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillText("Secret", width * 0.25, height * 0.3 - 20)

      // Animate proof transfer
      const proofX = width * 0.25 + width * 0.5 * Math.min(step / 100, 1)
      const proofY = height * 0.5 - 50 * Math.sin(Math.PI * Math.min(step / 100, 1))

      ctx.fillStyle = colors.proof
      ctx.beginPath()
      ctx.arc(proofX, proofY, 10, 0, Math.PI * 2)
      ctx.fill()

      // Draw proof label
      if (step > 20) {
        ctx.fillStyle = colors.text
        ctx.fillText("Proof", proofX, proofY - 15)
      }

      // Draw verification check when proof arrives
      if (step > 100) {
        ctx.strokeStyle = colors.verifier
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(width * 0.75 - 15, height * 0.5 - 15)
        ctx.lineTo(width * 0.75, height * 0.5)
        ctx.lineTo(width * 0.75 + 15, height * 0.5 - 20)
        ctx.stroke()
      }

      // Update animation step
      step = (step + 1) % 200
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
        <CardTitle>ZKP Visualization</CardTitle>
        <CardDescription>See how information flows in a zero-knowledge proof system</CardDescription>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-64 rounded-md border" />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          The prover sends a proof to the verifier without revealing the secret
        </p>
      </CardContent>
    </Card>
  )
}
