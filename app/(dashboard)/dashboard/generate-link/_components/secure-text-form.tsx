"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ExpiryCombobox } from "./expiry-combobox"
import { ViewCountCombobox } from "./view-count-combobox"
import { createSecureTextLink } from "@/app/actions/secure-link-actions"
import { SecureTextSchema, type SecureTextInput } from "@/lib/validations/secure-link"
import { Input } from "@/components/ui/input"
import { useCredits } from "@/app/context/credits-context"

interface SecureTextFormProps {
  userId: string
  onLinkGenerated: (link: string) => void
}

export function SecureTextForm({ userId, onLinkGenerated }: SecureTextFormProps) {
  const { credits, refreshCredits } = useCredits()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SecureTextInput>({
    resolver: zodResolver(SecureTextSchema),
    defaultValues: {
      title: "",
      content: "",
      expiryTime: "24h",
      maxViews: "3",
    },
  })

  const onSubmit = async (data: SecureTextInput) => {
    if (credits <= 0 && credits !== Number.POSITIVE_INFINITY) {
      toast("No credits remaining. Please upgrade your plan to create more secure links.")
      return
    }

    try {
      setIsSubmitting(true)
      const result = await createSecureTextLink({
        userId,
        title: data.title,
        content: data.content,
        expiryTime: data.expiryTime,
        maxViews: Number.parseInt(data.maxViews),
      })

      if (result.success) {
        onLinkGenerated(String(result.link))
        // Refresh credits immediately after successful link generation
        await refreshCredits(userId)
      } else {
        toast(result.error || "Failed to create secure link")
      }
    } catch (error) {
      toast("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the text you want to secure..."
                  className="min-h-[200px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="expiryTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Time</FormLabel>
                <FormControl>
                  <ExpiryCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxViews"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Views</FormLabel>
                <FormControl>
                  <ViewCountCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Secure Link...
            </>
          ) : (
            "Create Secure Link"
          )}
        </Button>
      </form>
    </Form>
  )
}
