import { Metadata } from "next"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { db } from "@/lib/config/db"
import { currentUser } from "@clerk/nextjs/server"

export const metadata: Metadata = {
  title: "Manage Links",
  description: "A link manager build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getLinks() {
  const clerUser = await currentUser()
  const data = await db.secureLink.findMany({
    where:{
      userId: clerUser?.id
    }
  })
  return data
}

export default async function ManageLinksPage() {
  const links = await getLinks()

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Links 🔗</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your links!
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <DataTable data={links} columns={columns} />
      </div>
    </>
  )
}
