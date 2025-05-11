"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CheckoutButtonProps {
  createCheckout: () => Promise<void>
}

export function CheckoutButton({ createCheckout }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      await createCheckout()
    } catch (error) {
      toast("You already purchased pro plan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full cursor-pointer" onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? "Processing..." : "Get Started"}
    </Button>
  )
}
