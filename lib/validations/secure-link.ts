import { z } from "zod"

export const SecureTextSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  expiryTime: z.string(),
  maxViews: z.string(),
})

export type SecureTextInput = z.infer<typeof SecureTextSchema>

export const SecureFileSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fileUrl: z.string().min(1, "File is required"),
  expiryTime: z.string(),
  maxViews: z.string(),
})

export type SecureFileInput = z.infer<typeof SecureFileSchema>

export const CreateSecureTextLinkSchema = z.object({
  userId: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  expiryTime: z.string(),
  maxViews: z.number().min(1).max(10),
})

export const CreateSecureFileLinkSchema = z.object({
  userId: z.string(),
  title: z.string().min(1, "Title is required"),
  fileUrl: z.string().min(1, "File URL is required"),
  expiryTime: z.string(),
  maxViews: z.number().min(1).max(10),
})
