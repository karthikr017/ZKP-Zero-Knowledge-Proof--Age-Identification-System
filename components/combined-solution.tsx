"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, ShieldIcon, LockIcon, LinkIcon } from "lucide-react"
import { generateAgeProof } from "@/lib/age-zkp"
import { createDid, issueDIDCredential } from "@/lib/did-service"
import { createAttestation } from "@/lib/blockchain-attestation"
import { Badge } from "@/components/ui/badge"

export function CombinedSolution() {
  const [birthdate, setBirthdate] = useState("")
  const [did, setDid] = useState<string | null>(null)
  const [credential, setCredential] = useState<string | null>(null)
  const [attestationTxHash, setAttestationTxHash] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNextStep = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      switch (currentStep) {
        case 0: // Create DID
          await new Promise((resolve) => setTimeout(resolve, 1500))
          const newDid = await createDid()
          setDid(newDid)
          break

        case 1: // Generate ZKP and issue credential
          if (!did || !birthdate) {
            setError("Missing DID or birthdate")
            break
          }

          await new Promise((resolve) => setTimeout(resolve, 2000))

          // Generate age proof
          const birthdateObj = new Date(birthdate)
          const proof = generateAgeProof(birthdateObj, 18)

          // Issue credential with the proof
          const newCredential = await issueDIDCredential(did, "AgeVerification", {
            ageVerified: "18+",
            proofType: "ZKP",
            proofId: proof.substring(0, 20), // Use part of the proof as an ID
          })

          setCredential(newCredential)
          break

        case 2: // Create blockchain attestation
          if (!credential) {
            setError("Missing credential")
            break
          }

          await new Promise((resolve) => setTimeout(resolve, 2000))

          // Create attestation using credential ID
          const credentialObj = JSON.parse(credential)
          const txHash = await createAttestation(credentialObj.id)
          setAttestationTxHash(txHash)
          break
      }

      // Move to next step if no errors
      if (!error) {
        setCurrentStep((prev) => prev + 1)
      }
    } catch (err) {
      console.error("Error in process:", err)
      setError("An error occurred during the process")
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Step 1: Create Your Decentralized Identifier</h3>
            <p className="text-sm text-muted-foreground">
              A DID is the foundation of your self-sovereign identity. It's cryptographically secured and controlled
              only by you.
            </p>
            <Button onClick={handleNextStep} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Creating DID...
                </>
              ) : (
                <>
                  <LockIcon className="mr-2 h-4 w-4" />
                  Create My DID
                </>
              )}
            </Button>

            {did && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-xs font-medium mb-1">Your DID:</p>
                <p className="font-mono text-xs break-all">{did}</p>
              </div>
            )}
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Step 2: Generate ZKP & Issue Credential</h3>
            <p className="text-sm text-muted-foreground">
              Enter your birthdate to generate a zero-knowledge proof and receive a verifiable credential.
            </p>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Your Birthdate</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
              <p className="text-xs text-muted-foreground">
                This stays private and is only used to generate your proof.
              </p>
            </div>

            <Button onClick={handleNextStep} disabled={isProcessing || !birthdate} className="w-full">
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Generating Proof & Credential...
                </>
              ) : (
                <>
                  <ShieldIcon className="mr-2 h-4 w-4" />
                  Generate ZKP & Issue Credential
                </>
              )}
            </Button>

            {credential && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-xs font-medium mb-1">Your Verifiable Credential:</p>
                <div className="font-mono text-xs break-all max-h-24 overflow-y-auto">{credential}</div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Step 3: Create Blockchain Attestation</h3>
            <p className="text-sm text-muted-foreground">
              Create an immutable record of your age verification on the blockchain without revealing personal data.
            </p>

            <Button onClick={handleNextStep} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Creating Attestation...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Create Blockchain Attestation
                </>
              )}
            </Button>

            {attestationTxHash && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-xs font-medium mb-1">Transaction Hash:</p>
                <p className="font-mono text-xs break-all">{attestationTxHash}</p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertTitle>Complete Privacy-Preserving Identity Created!</AlertTitle>
              <AlertDescription>
                You've successfully created a complete privacy-preserving age verification solution that combines:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Self-sovereign identity with W3C DIDs</li>
                  <li>Zero-knowledge proof of age without revealing birthdate</li>
                  <li>Blockchain attestation for immutable verification</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">What you can do with this:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <ShieldIcon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>Prove your age across multiple services without re-verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <LockIcon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>Maintain complete control over your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <LinkIcon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>Have cryptographic proof of verification that can't be altered</span>
                </li>
              </ul>
            </div>

            <Button onClick={() => setCurrentStep(0)} className="w-full">
              Start Over
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Complete Privacy-Preserving Identity</CardTitle>
            <CardDescription>Combining ZKP, DIDs, and Blockchain Attestations</CardDescription>
          </div>
          <Badge className="bg-primary/10 text-primary">Advanced</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Progress</h3>
            <span className="text-sm text-muted-foreground">Step {currentStep + 1} of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <XCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {renderStepContent()}
      </CardContent>
      <CardFooter className="border-t p-4 text-sm text-muted-foreground">
        <p>
          This demonstration combines three powerful technologies: Zero-Knowledge Proofs for privacy-preserving age
          verification, W3C Decentralized Identifiers for self-sovereign identity, and blockchain attestations for
          immutable proof of verification.
        </p>
      </CardFooter>
    </Card>
  )
}
