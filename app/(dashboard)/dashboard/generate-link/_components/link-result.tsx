"use client"

import { useState } from "react"
import { Check, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface LinkResultProps {
  link: string
  onReset: () => void
}

export function LinkResult({ link, onReset }: LinkResultProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)

      toast("Link copied to clipboard")

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast("Failed to copy link")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Secure Link Generated!</CardTitle>
        <CardDescription>
          Your content is now securely stored. Share this link with anyone you want to access it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input value={link} readOnly className="font-mono text-sm" />
          <Button variant="outline" size="icon" onClick={copyToClipboard} className="flex-shrink-0 cursor-pointer">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy link</span>
          </Button>
        </div>

        <div className="rounded-md bg-muted p-4">
          <div className="text-sm font-medium">Link details:</div>
          <ul className="mt-2 text-sm text-muted-foreground">
            <li>• This link will be accessible to anyone who has it</li>
            <li>• The link will expire based on your selected expiry time</li>
            <li>• The content will be inaccessible after the maximum view count is reached</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full cursor-pointer" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Create Another Secure Link
        </Button>
      </CardFooter>
    </Card>
  )
}
