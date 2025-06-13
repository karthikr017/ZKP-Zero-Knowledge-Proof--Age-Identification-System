"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, LinkIcon, ShieldIcon, LockIcon } from "lucide-react"
import { createAttestation, verifyAttestation } from "@/lib/blockchain-attestation"
import { Badge } from "@/components/ui/badge"

export function BlockchainAttestation() {
  const [isAttesting, setIsAttesting] = useState(false)
  const [attestationTxHash, setAttestationTxHash] = useState<string | null>(null)
  const [attestationStatus, setAttestationStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "pending" | "success" | "error">("idle")

  const handleCreateAttestation = async (proofId: string) => {
    setIsAttesting(true)
    setAttestationStatus("pending")

    try {
      // Simulate blockchain transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const txHash = await createAttestation(proofId)
      setAttestationTxHash(txHash)
      setAttestationStatus("success")
    } catch (error) {
      console.error("Error creating attestation:", error)
      setAttestationStatus("error")
    } finally {
      setIsAttesting(false)
    }
  }

  const handleVerifyAttestation = async () => {
    if (!attestationTxHash) return

    setVerificationStatus("pending")

    try {
      // Simulate blockchain verification delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const isValid = await verifyAttestation(attestationTxHash)
      setVerificationStatus(isValid ? "success" : "error")
    } catch (error) {
      console.error("Error verifying attestation:", error)
      setVerificationStatus("error")
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Blockchain Attestation</CardTitle>
            <CardDescription>Immutable proof of age verification</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Privacy-Preserving
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <LinkIcon className="h-5 w-5 mr-2 text-primary" />
            How Blockchain Attestations Work
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Blockchain attestations create tamper-proof records that your age has been verified, without storing any
            personal information on-chain. This allows for trustless verification while preserving your privacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-background p-3 rounded-md">
              <div className="font-medium mb-1">1. Create Proof</div>
              <div className="text-xs text-muted-foreground">Generate ZKP age proof</div>
            </div>
            <div className="bg-background p-3 rounded-md">
              <div className="font-medium mb-1">2. Attest On-Chain</div>
              <div className="text-xs text-muted-foreground">Store hash of proof on blockchain</div>
            </div>
            <div className="bg-background p-3 rounded-md">
              <div className="font-medium mb-1">3. Verify Anytime</div>
              <div className="text-xs text-muted-foreground">Check immutable blockchain record</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Demonstration</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Step 1: Create Blockchain Attestation</h4>
              <Button
                onClick={() => handleCreateAttestation("proof-123456789")}
                disabled={isAttesting || attestationStatus === "success"}
                className="w-full"
              >
                {isAttesting ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    Creating Attestation...
                  </>
                ) : (
                  <>
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Create Blockchain Attestation
                  </>
                )}
              </Button>

              {attestationStatus === "success" && attestationTxHash && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                  <div className="p-2 bg-muted rounded-md font-mono text-xs break-all">{attestationTxHash}</div>
                </div>
              )}

              {attestationStatus === "error" && (
                <Alert variant="destructive" className="mt-2">
                  <XCircleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Failed to create blockchain attestation</AlertDescription>
                </Alert>
              )}
            </div>

            {attestationStatus === "success" && (
              <div>
                <h4 className="text-sm font-medium mb-2">Step 2: Verify Attestation</h4>
                <Button
                  onClick={handleVerifyAttestation}
                  disabled={verificationStatus === "pending"}
                  variant="outline"
                  className="w-full"
                >
                  {verificationStatus === "pending" ? (
                    <>
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-primary animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <LockIcon className="mr-2 h-4 w-4" />
                      Verify On-Chain Attestation
                    </>
                  )}
                </Button>

                {verificationStatus === "success" && (
                  <Alert className="mt-2">
                    <CheckCircle2Icon className="h-4 w-4" />
                    <AlertTitle>Verification Successful</AlertTitle>
                    <AlertDescription>
                      The blockchain attestation is valid. The age verification has been confirmed on-chain.
                    </AlertDescription>
                  </Alert>
                )}

                {verificationStatus === "error" && (
                  <Alert variant="destructive" className="mt-2">
                    <XCircleIcon className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      The blockchain attestation could not be verified or has been revoked.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <ShieldIcon className="h-4 w-4 mt-0.5 text-primary" />
          <p>
            Blockchain attestations provide cryptographic proof that your age has been verified without storing your
            personal data on-chain. Only a hash of your proof is stored, maintaining your privacy while creating an
            immutable record.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
