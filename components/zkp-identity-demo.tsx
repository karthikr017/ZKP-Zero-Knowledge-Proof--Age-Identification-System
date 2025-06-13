"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, KeyIcon, ShieldIcon } from "lucide-react"
import { generateZkpProof, verifyZkpProof } from "@/lib/zkp"

export function ZkpIdentityDemo() {
  const [secretValue, setSecretValue] = useState("")
  const [publicValue, setPublicValue] = useState("")
  const [proof, setProof] = useState<string | null>(null)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [verifierPublicValue, setVerifierPublicValue] = useState("")
  const [verifierProof, setVerifierProof] = useState("")
  const [activeTab, setActiveTab] = useState("prover")
  const [steps, setSteps] = useState<{
    secretEntered: boolean
    publicEntered: boolean
    proofGenerated: boolean
    proofVerified: boolean
  }>({
    secretEntered: false,
    publicEntered: false,
    proofGenerated: false,
    proofVerified: false,
  })

  const handleGenerateProof = () => {
    if (!secretValue || !publicValue) return

    try {
      const generatedProof = generateZkpProof(secretValue, publicValue)
      setProof(generatedProof)
      setSteps((prev) => ({ ...prev, proofGenerated: true }))
    } catch (error) {
      console.error("Error generating proof:", error)
    }
  }

  const handleVerifyProof = () => {
    if (!verifierPublicValue || !verifierProof) return

    try {
      const result = verifyZkpProof(verifierProof, verifierPublicValue)
      setVerificationResult(result)
      setSteps((prev) => ({ ...prev, proofVerified: true }))
    } catch (error) {
      console.error("Error verifying proof:", error)
      setVerificationResult(false)
    }
  }

  const handleCopyToVerifier = () => {
    setVerifierPublicValue(publicValue)
    setVerifierProof(proof || "")
    setActiveTab("verifier")
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Interactive ZKP Demo</CardTitle>
        <CardDescription>Experience how zero-knowledge proofs work in practice</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prover">Prover (You)</TabsTrigger>
            <TabsTrigger value="verifier">Verifier</TabsTrigger>
          </TabsList>

          <TabsContent value="prover" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secret-value">Secret Value (e.g., password)</Label>
                <div className="flex gap-4">
                  <Input
                    id="secret-value"
                    type="password"
                    placeholder="Enter your secret"
                    value={secretValue}
                    onChange={(e) => {
                      setSecretValue(e.target.value)
                      setSteps((prev) => ({ ...prev, secretEntered: !!e.target.value }))
                    }}
                  />
                  <div className="w-8 flex items-center justify-center">
                    {steps.secretEntered && <CheckCircle2Icon className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is the private information you want to keep secret.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="public-value">Public Value (e.g., username)</Label>
                <div className="flex gap-4">
                  <Input
                    id="public-value"
                    placeholder="Enter public identifier"
                    value={publicValue}
                    onChange={(e) => {
                      setPublicValue(e.target.value)
                      setSteps((prev) => ({ ...prev, publicEntered: !!e.target.value }))
                    }}
                  />
                  <div className="w-8 flex items-center justify-center">
                    {steps.publicEntered && <CheckCircle2Icon className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">This is information that can be shared publicly.</p>
              </div>

              <Button onClick={handleGenerateProof} disabled={!secretValue || !publicValue} className="w-full">
                <KeyIcon className="mr-2 h-4 w-4" />
                Generate ZKP Proof
              </Button>

              {proof && (
                <div className="space-y-2 pt-4">
                  <Label>Generated Proof</Label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">{proof}</div>
                  <Button variant="outline" onClick={handleCopyToVerifier} className="w-full mt-2">
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Send to Verifier
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="verifier" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verifier-public-value">Public Value</Label>
                <Input
                  id="verifier-public-value"
                  placeholder="Enter public identifier"
                  value={verifierPublicValue}
                  onChange={(e) => setVerifierPublicValue(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">The public information associated with the identity.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verifier-proof">ZKP Proof</Label>
                <Input
                  id="verifier-proof"
                  placeholder="Enter the proof to verify"
                  value={verifierProof}
                  onChange={(e) => setVerifierProof(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">The proof provided by the prover.</p>
              </div>

              <Button onClick={handleVerifyProof} disabled={!verifierPublicValue || !verifierProof} className="w-full">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Verify Proof
              </Button>

              {verificationResult !== null && (
                <Alert variant={verificationResult ? "default" : "destructive"}>
                  {verificationResult ? (
                    <>
                      <CheckCircle2Icon className="h-4 w-4" />
                      <AlertTitle>Verification Successful</AlertTitle>
                      <AlertDescription>
                        The proof is valid. The prover knows the secret value without revealing it.
                      </AlertDescription>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-4 w-4" />
                      <AlertTitle>Verification Failed</AlertTitle>
                      <AlertDescription>
                        The proof is invalid. The prover may not know the correct secret value.
                      </AlertDescription>
                    </>
                  )}
                </Alert>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t p-6">
        <h3 className="font-semibold mb-2">How This Demo Works</h3>
        <p className="text-sm text-muted-foreground">
          This simplified ZKP demonstration uses a hash-based commitment scheme. The prover creates a proof by combining
          their secret with a public value, and the verifier can check this proof without ever learning the secret. In
          real-world applications, more sophisticated cryptographic protocols are used.
        </p>
      </CardFooter>
    </Card>
  )
}
