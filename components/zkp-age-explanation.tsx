import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldIcon, LockIcon, CalendarIcon } from "lucide-react"

export function ZkpAgeExplanation() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Age Verification Without Revealing Your Birthdate</CardTitle>
        <CardDescription>How zero-knowledge proofs protect your privacy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">The Problem</h3>
            <p className="text-muted-foreground">
              Traditional age verification requires sharing your exact birthdate, revealing more information than
              necessary.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <LockIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">The Solution</h3>
            <p className="text-muted-foreground">
              Zero-knowledge proofs allow you to prove you're above an age threshold without revealing your actual
              birthdate.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <ShieldIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">The Benefit</h3>
            <p className="text-muted-foreground">
              Maintain privacy while still complying with age-restricted services and content.
            </p>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">How It Works</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <span className="font-medium">Input your birthdate</span> - This stays private on your device
            </li>
            <li>
              <span className="font-medium">Select age threshold</span> - The minimum age you need to prove
            </li>
            <li>
              <span className="font-medium">Generate a proof</span> - Mathematical evidence that you're above the
              threshold
            </li>
            <li>
              <span className="font-medium">Verification</span> - The service can verify you meet the age requirement
              without learning your birthdate
            </li>
          </ol>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">Real-world applications:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Age-restricted website access</li>
            <li>Purchasing age-restricted products</li>
            <li>Voting eligibility verification</li>
            <li>Senior discounts without revealing exact age</li>
            <li>Age-gated content on social media</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
