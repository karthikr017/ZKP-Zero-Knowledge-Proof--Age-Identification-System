import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LockIcon, ShieldIcon, EyeOffIcon } from "lucide-react"

export function ZkpExplanation() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Understanding Zero-Knowledge Proofs</CardTitle>
        <CardDescription>How to prove you know something without revealing what you know</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="concept">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="concept" className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">What is a Zero-Knowledge Proof?</h3>
                <p className="text-muted-foreground">
                  A zero-knowledge proof is a method by which one party (the prover) can prove to another party (the
                  verifier) that they know a value x, without conveying any information apart from the fact that they
                  know the value x.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <EyeOffIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Key Properties</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>
                    <strong>Completeness:</strong> If the statement is true, an honest verifier will be convinced by an
                    honest prover.
                  </li>
                  <li>
                    <strong>Soundness:</strong> If the statement is false, no cheating prover can convince an honest
                    verifier that it is true.
                  </li>
                  <li>
                    <strong>Zero-knowledge:</strong> If the statement is true, the verifier learns nothing other than
                    the fact that the statement is true.
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Privacy Protection</h3>
                <p className="text-muted-foreground">
                  ZKPs allow users to prove possession of certain information without revealing the information itself,
                  protecting sensitive data like passwords, personal details, or financial information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Reduced Data Exposure</h3>
                <p className="text-muted-foreground">
                  By minimizing the amount of data shared during verification, ZKPs reduce the risk of data breaches and
                  unauthorized access to sensitive information.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Identity Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Prove you are who you claim to be without revealing personal information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Blockchain & Cryptocurrency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enable private transactions while maintaining the integrity of the blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Age Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Prove you're above a certain age without revealing your exact birthdate.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Credential Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Prove you have certain qualifications without revealing specific details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
