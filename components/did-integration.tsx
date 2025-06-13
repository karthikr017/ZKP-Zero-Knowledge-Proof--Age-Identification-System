"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, KeyIcon, UserIcon, ShieldIcon } from "lucide-react"
import { createDid, issueDIDCredential, verifyDIDCredential } from "@/lib/did-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function DIDIntegration() {
  const [did, setDid] = useState<string | null>(null)
  const [isCreatingDid, setIsCreatingDid] = useState(false)
  const [credential, setCredential] = useState<string | null>(null)
  const [isIssuingCredential, setIsIssuingCredential] = useState(false)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [activeTab, setActiveTab] = useState("create")

  const handleCreateDID = async () => {
    setIsCreatingDid(true)

    try {
      // Simulate DID creation delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newDid = await createDid()
      setDid(newDid)
      setActiveTab("issue")
    } catch (error) {
      console.error("Error creating DID:", error)
    } finally {
      setIsCreatingDid(false)
    }
  }

  const handleIssueCredential = async () => {
    if (!did) return

    setIsIssuingCredential(true)

    try {
      // Simulate credential issuance delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newCredential = await issueDIDCredential(did, "AgeVerification", { ageVerified: "18+" })
      setCredential(newCredential)
      setActiveTab("verify")
    } catch (error) {
      console.error("Error issuing credential:", error)
    } finally {
      setIsIssuingCredential(false)
    }
  }

  const handleVerifyCredential = async () => {
    if (!credential) return

    setIsVerifying(true)

    try {
      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const result = await verifyDIDCredential(credential)
      setVerificationResult(result)
    } catch (error) {
      console.error("Error verifying credential:", error)
      setVerificationResult(false)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Decentralized Identifiers (DIDs)</CardTitle>
            <CardDescription>Self-sovereign identity for age verification</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            W3C Standard
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <UserIcon className="h-5 w-5 mr-2 text-primary" />
            What are Decentralized Identifiers?
          </h3>
          <p className="text-sm text-muted-foreground">
            DIDs are a W3C standard for portable, self-sovereign digital identities. Unlike traditional identifiers,
            DIDs are controlled by you, not a central authority. They enable verifiable, privacy-preserving credentials
            that you can share selectively.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">1. Create DID</TabsTrigger>
            <TabsTrigger value="issue" disabled={!did}>
              2. Issue Credential
            </TabsTrigger>
            <TabsTrigger value="verify" disabled={!credential}>
              3. Verify
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Create Your Decentralized Identifier</Label>
              <p className="text-sm text-muted-foreground">
                A DID is the foundation of your self-sovereign identity. It's cryptographically secured and controlled
                only by you.
              </p>
              <Button onClick={handleCreateDID} disabled={isCreatingDid || !!did} className="w-full mt-2">
                {isCreatingDid ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    Creating DID...
                  </>
                ) : (
                  <>
                    <KeyIcon className="mr-2 h-4 w-4" />
                    Create My DID
                  </>
                )}
              </Button>
            </div>

            {did && (
              <div className="space-y-2">
                <Label>Your Decentralized Identifier (DID)</Label>
                <div className="p-3 bg-muted rounded-md font-mono text-xs break-all">{did}</div>
                <p className="text-xs text-muted-foreground">
                  This is your unique identifier that you control. It's cryptographically secured and can be used across
                  different services.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="issue" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Issue Age Verification Credential</Label>
              <p className="text-sm text-muted-foreground">
                Now that you have a DID, you can receive a verifiable credential attesting to your age verification.
              </p>
              <Button
                onClick={handleIssueCredential}
                disabled={isIssuingCredential || !!credential}
                className="w-full mt-2"
              >
                {isIssuingCredential ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    Issuing Credential...
                  </>
                ) : (
                  <>
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Issue Age Verification Credential
                  </>
                )}
              </Button>
            </div>

            {credential && (
              <div className="space-y-2">
                <Label>Your Verifiable Credential</Label>
                <div className="p-3 bg-muted rounded-md font-mono text-xs break-all max-h-32 overflow-y-auto">
                  {credential}
                </div>
                <p className="text-xs text-muted-foreground">
                  This credential cryptographically proves your age verification status without revealing your actual
                  birthdate. You can share this with services that need to verify your age.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="verify" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Verify Age Credential</Label>
              <p className="text-sm text-muted-foreground">
                Services can verify your age credential without contacting the original issuer, thanks to the
                cryptographic properties of DIDs.
              </p>
              <Button onClick={handleVerifyCredential} disabled={isVerifying} className="w-full mt-2">
                {isVerifying ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Verify Credential
                  </>
                )}
              </Button>
            </div>

            {verificationResult !== null && (
              <Alert variant={verificationResult ? "default" : "destructive"}>
                {verificationResult ? (
                  <>
                    <CheckCircle2Icon className="h-4 w-4" />
                    <AlertTitle>Verification Successful</AlertTitle>
                    <AlertDescription>
                      The age verification credential is valid and cryptographically secure. The user has proven they
                      are 18+ without revealing their birthdate.
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      The credential could not be verified. It may be invalid, expired, or revoked.
                    </AlertDescription>
                  </>
                )}
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <KeyIcon className="h-4 w-4 mt-0.5 text-primary" />
          <p>
            DIDs give you control over your digital identity. You can selectively disclose only the information needed
            (like being over 18) without revealing unnecessary personal details. This credential can be used across
            multiple services without requiring re-verification.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
