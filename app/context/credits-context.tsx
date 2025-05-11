"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getUserCredits } from "@/app/actions/user-actions"

type CreditsContextType = {
  credits: number
  refreshCredits: (userId: string) => Promise<void>
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined)

export function CreditsProvider({
  children,
  initialCredits,
  userId,
}: {
  children: ReactNode
  initialCredits: number
  userId: string
}) {
  const [credits, setCredits] = useState<number>(initialCredits)

  const refreshCredits = async (userId: string) => {
    try {
      const updatedCredits = await getUserCredits(userId)
      setCredits(updatedCredits)
    } catch (error) {
      console.error("Failed to refresh credits:", error)
    }
  }

  return <CreditsContext.Provider value={{ credits, refreshCredits }}>{children}</CreditsContext.Provider>
}

export function useCredits() {
  const context = useContext(CreditsContext)
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditsProvider")
  }
  return context
}
