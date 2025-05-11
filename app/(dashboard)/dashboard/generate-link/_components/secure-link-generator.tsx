"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecureTextForm } from "./secure-text-form"
import { SecureFileForm } from "./secure-file-form"
import { LinkResult } from "./link-result"

interface SecureLinkGeneratorProps {
  userId: string
}

export function SecureLinkGenerator({ userId }: SecureLinkGeneratorProps) {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const handleLinkGenerated = (link: string) => {
    setGeneratedLink(link)
  }

  const resetLink = () => {
    setGeneratedLink(null)
  }

  if (generatedLink) {
    return <LinkResult link={generatedLink} onReset={resetLink} />
  }

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="text" className="cursor-pointer">
          Secure Text
        </TabsTrigger>
        <TabsTrigger value="file" className="cursor-pointer">
          Secure File
        </TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        <SecureTextForm userId={userId} onLinkGenerated={handleLinkGenerated} />
      </TabsContent>

      <TabsContent value="file">
        <SecureFileForm userId={userId} onLinkGenerated={handleLinkGenerated} />
      </TabsContent>
    </Tabs>
  )
}
