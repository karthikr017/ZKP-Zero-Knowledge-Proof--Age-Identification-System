import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBagIcon, GlassWaterIcon, TicketIcon, CreditCardIcon as IdCardIcon, MonitorIcon } from "lucide-react"

export function AgeVerificationUseCases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-World Applications</CardTitle>
        <CardDescription>Where ZKP age verification can be used</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Online Retail</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Purchase age-restricted products like alcohol or tobacco without revealing your exact birthdate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <GlassWaterIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Venue Entry</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gain entry to age-restricted venues like bars and clubs while maintaining privacy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Senior Discounts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Prove eligibility for senior discounts without revealing your exact age.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <IdCardIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Voting Eligibility</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verify you're old enough to vote without exposing personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MonitorIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Content Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access age-restricted content on streaming platforms or social media.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
