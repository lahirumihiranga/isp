"use server";
import { z } from "zod";
import { db } from "../../lib/config/db";
import { generateId } from "../../lib/utils";
import {
  CreateSecureTextLinkSchema,
  CreateSecureFileLinkSchema,
} from "../../lib/validations/secure-link";
import { decrementUserCredits } from "./user-actions";
import type { SecureLink } from "../../lib/types/global";

// Helper function to calculate expiry date
function calculateExpiryDate(expiryTime: string): Date | null {
  if (!expiryTime) return null;

  const now = new Date();
  const hours = Number.parseInt(expiryTime.replace("h", ""));

  if (isNaN(hours)) return null;

  return new Date(now.getTime() + hours * 60 * 60 * 1000);
}

export async function createSecureTextLink(
  input: z.infer<typeof CreateSecureTextLinkSchema>
) {
  try {
    // Validate input
    const validatedInput = CreateSecureTextLinkSchema.parse(input);

    // Generate a unique ID for the link
    const id = generateId();

    // Calculate expiry date
    const expiresAt = calculateExpiryDate(validatedInput.expiryTime);

    // Create the secure link
    await db.secureLink.create({
      data: {
        id,
        userId: validatedInput.userId,
        type: "TEXT",
        title: validatedInput.title,
        content: validatedInput.content,
        expiresAt,
        maxViews: validatedInput.maxViews,
        currentViews: 0,
      },
    });

    // Decrement user credits
    await decrementUserCredits(validatedInput.userId);

    // Generate the full URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const link = `${baseUrl}/s/${id}`;

    return { success: true, link };
  } catch (error) {
    console.error("Error creating secure text link:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input. Please check your data and try again.",
      };
    }

    return {
      success: false,
      error: "Failed to create secure link. Please try again.",
    };
  }
}

export async function createSecureFileLink(
  input: z.infer<typeof CreateSecureFileLinkSchema>
) {
  try {
    // Validate input
    const validatedInput = CreateSecureFileLinkSchema.parse(input);

    // Generate a unique ID for the link
    const id = generateId();

    // Calculate expiry date
    const expiresAt = calculateExpiryDate(validatedInput.expiryTime);

    // Create the secure link
    await db.secureLink.create({
      data: {
        id,
        userId: validatedInput.userId,
        type: "FILE",
        title: validatedInput.title,
        fileUrl: validatedInput.fileUrl,
        expiresAt,
        maxViews: validatedInput.maxViews,
        currentViews: 0,
      },
    });

    // Decrement user credits
    await decrementUserCredits(validatedInput.userId);

    // Generate the full URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const link = `${baseUrl}/s/${id}`;

    return { success: true, link };
  } catch (error) {
    console.error("Error creating secure file link:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input. Please check your data and try again.",
      };
    }

    return {
      success: false,
      error: "Failed to create secure link. Please try again.",
    };
  }
}

export async function getSecureLink(id: string): Promise<SecureLink | null> {
  try {
    const secureLink = await db.secureLink.findUnique({
      where: { id },
    });

    if (!secureLink) {
      return null;
    }

    // Check if the link has expired
    if (secureLink.expiresAt && new Date(secureLink.expiresAt) < new Date()) {
      return secureLink as SecureLink;
    }

    // Check if the link has reached max views
    if (secureLink.currentViews >= secureLink.maxViews) {
      return secureLink as SecureLink;
    }

    return secureLink as SecureLink;
  } catch (error) {
    console.error("Error getting secure link:", error);
    return null;
  }
}

export async function incrementViewCount(id: string): Promise<boolean> {
  try {
    const secureLink = await db.secureLink.findUnique({
      where: { id },
    });

    if (!secureLink) {
      return false;
    }

    let isExpired = false;
    // Check if the link has expired or reached max views
    if (
      (secureLink.expiresAt && new Date(secureLink.expiresAt) < new Date()) ||
      secureLink.currentViews >= secureLink.maxViews
    ) {
      isExpired = true;
      return true;
    }

    // Increment the view count
    await db.secureLink.update({
      where: { id },
      data: {
        currentViews: {
          increment: 1,
        },
        isExpired: isExpired,
      },
    });

    return true;
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return false;
  }
}

export async function getUserSecureLinks(userId: string) {
  try {
    const secureLinks = await db.secureLink.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return secureLinks as SecureLink[];
  } catch (error) {
    console.error("Error getting user secure links:", error);
    return [];
  }
}

export async function deleteSecureLink(id: string): Promise<boolean> {
  try {
    await db.secureLink.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting secure link:", error);
    return false;
  }
}
