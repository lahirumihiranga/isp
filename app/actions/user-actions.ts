"use server";

import { db } from "../../lib/config/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserCredits(userId: string): Promise<number> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true, credits: true },
    });

    if (!user) {
      // Create user if it doesn't exist
      const clerkUser = await currentUser();

      if (!clerkUser) {
        throw new Error("User not found");
      }

      const newUser = await db.user.create({
        data: {
          id: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          plan: "FREE",
          credits: 3, // Free plan starts with 3 credits
        },
      });

      return newUser.credits;
    }

    // If user is on lifetime plan, return Infinity
    if (user.plan === "LIFETIME") {
      return Number.POSITIVE_INFINITY;
    }

    return user.credits;
  } catch (error) {
    console.error("Error getting user credits:", error);
    return 0;
  }
}

export async function decrementUserCredits(userId: string): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true, credits: true },
    });

    if (!user) {
      return false;
    }

    // If user is on lifetime plan, don't decrement credits
    if (user.plan === "LIFETIME") {
      return true;
    }

    // If user has no credits left, return false
    if (user.credits <= 0) {
      return false;
    }

    // Decrement credits
    await db.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error decrementing user credits:", error);
    return false;
  }
}

export async function upgradeUserToPremium(userId: string): Promise<boolean> {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        plan: "LIFETIME",
      },
    });

    return true;
  } catch (error) {
    console.error("Error upgrading user to premium:", error);
    return false;
  }
}
