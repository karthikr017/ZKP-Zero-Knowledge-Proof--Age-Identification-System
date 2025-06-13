import { AgeVerificationDemo } from "@/components/age-verification-demo"
import { ZkpAgeExplanation } from "@/components/zkp-age-explanation"
import { BlockchainAttestation } from "@/components/blockchain-attestation"
import { DIDIntegration } from "@/components/did-integration"
import { CombinedSolution } from "@/components/combined-solution"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Enhanced ZKP Age Verification System</h1>
      <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
        Combining Zero-Knowledge Proofs with Blockchain Attestations and Decentralized Identifiers
      </p>

      <div className="grid gap-12">
        <ZkpAgeExplanation />
        <AgeVerificationDemo />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BlockchainAttestation />
          <DIDIntegration />
        </div>

        <CombinedSolution />
      </div>
    </div>
  )
}
