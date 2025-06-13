"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, XCircleIcon, ShieldIcon, CalendarIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateAgeProof, verifyAgeProof } from "@/lib/age-zkp"

export function AgeVerificationDemo() {
  const [birthdate, setBirthdate] = useState("")
  const [ageThreshold, setAgeThreshold] = useState("18")
  const [proof, setProof] = useState<string | null>(null)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [verifierThreshold, setVerifierThreshold] = useState("18")
  const [verifierProof, setVerifierProof] = useState("")
  const [activeTab, setActiveTab] = useState("prover")
  const [error, setError] = useState<string | null>(null)

  const handleGenerateProof = () => {
    if (!birthdate) {
      setError("Please enter your birthdate")
      return
    }

    try {
      const birthdateObj = new Date(birthdate)
      if (isNaN(birthdateObj.getTime())) {
        setError("Invalid birthdate")
        return
      }

      const threshold = Number.parseInt(ageThreshold)
      const generatedProof = generateAgeProof(birthdateObj, threshold)
      setProof(generatedProof)
      setError(null)
    } catch (err) {
      console.error("Error generating proof:", err)
      setError("Failed to generate proof")
    }
  }

  const handleVerifyProof = () => {
    if (!verifierProof) {
      setError("Please enter a proof to verify")
      return
    }

    try {
      const threshold = Number.parseInt(verifierThreshold)
      const result = verifyAgeProof(verifierProof, threshold)
      setVerificationResult(result)
      setError(null)
    } catch (err) {
      console.error("Error verifying proof:", err)
      setVerificationResult(false)
      setError("Invalid proof format")
    }
  }

  const handleCopyToVerifier = () => {
    setVerifierProof(proof || "")
    setVerifierThreshold(ageThreshold)
    setActiveTab("verifier")
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Age Verification Demo</CardTitle>
        <CardDescription>Prove you're above an age threshold without revealing your birthdate</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prover">User (Prover)</TabsTrigger>
            <TabsTrigger value="verifier">Service (Verifier)</TabsTrigger>
          </TabsList>

          <TabsContent value="prover" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate">Your Birthdate</Label>
                <div className="flex gap-4">
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <div className="w-8 flex items-center justify-center">
                    {birthdate && <CheckCircle2Icon className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">This information stays private on your device.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age-threshold">Age Threshold to Prove</Label>
                <Select value={ageThreshold} onValueChange={setAgeThreshold}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">13 years or older</SelectItem>
                    <SelectItem value="18">18 years or older</SelectItem>
                    <SelectItem value="21">21 years or older</SelectItem>
                    <SelectItem value="25">25 years or older</SelectItem>
                    <SelectItem value="55">55 years or older (Senior)</SelectItem>
                    <SelectItem value="65">65 years or older (Retirement)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Select the minimum age you need to prove.</p>
              </div>

              <Button onClick={handleGenerateProof} disabled={!birthdate} className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Generate Age Proof
              </Button>

              {error && (
                <Alert variant="destructive">
                  <XCircleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                <Label htmlFor="verifier-threshold">Required Age Threshold</Label>
                <Select value={verifierThreshold} onValueChange={setVerifierThreshold}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">13 years or older</SelectItem>
                    <SelectItem value="18">18 years or older</SelectItem>
                    <SelectItem value="21">21 years or older</SelectItem>
                    <SelectItem value="25">25 years or older</SelectItem>
                    <SelectItem value="55">55 years or older (Senior)</SelectItem>
                    <SelectItem value="65">65 years or older (Retirement)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The minimum age required for your service.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verifier-proof">Age Proof</Label>
                <Input
                  id="verifier-proof"
                  placeholder="Enter the age proof to verify"
                  value={verifierProof}
                  onChange={(e) => setVerifierProof(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">The proof provided by the user.</p>
              </div>

              <Button onClick={handleVerifyProof} disabled={!verifierProof} className="w-full">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Verify Age Proof
              </Button>

              {verificationResult !== null && (
                <Alert variant={verificationResult ? "default" : "destructive"}>
                  {verificationResult ? (
                    <>
                      <CheckCircle2Icon className="h-4 w-4" />
                      <AlertTitle>Age Verification Successful</AlertTitle>
                      <AlertDescription>
                        The user has proven they are {verifierThreshold} years or older without revealing their exact
                        birthdate.
                      </AlertDescription>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-4 w-4" />
                      <AlertTitle>Age Verification Failed</AlertTitle>
                      <AlertDescription>
                        The user has not proven they meet the age requirement of {verifierThreshold} years or older.
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
        <h3 className="font-semibold mb-2">Privacy Protection</h3>
        <p className="text-sm text-muted-foreground">
          This demo uses a simplified ZKP implementation to demonstrate the concept. The proof contains cryptographic
          evidence that you're above the specified age threshold, without revealing your actual birthdate. In a
          production system, more sophisticated cryptographic protocols would be used for stronger security guarantees.
        </p>
      </CardFooter>
    </Card>
  )
}
