import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { getUserCredits } from "@/app/actions/user-actions"
import { SecureLinkGenerator } from "./_components/secure-link-generator"
import DashboardHeader from "./_components/dashboard-header"
import { CreditsProvider } from "../../../context/credits-context"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const credits = await getUserCredits(userId)

  return (
    <CreditsProvider initialCredits={credits} userId={userId}>
      <div className="container max-w-5xl py-8 mx-auto">
        <DashboardHeader />
        <div className="mt-8">
          <SecureLinkGenerator userId={userId} />
        </div>
      </div>
    </CreditsProvider>
  )
}
