import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { nanoid } from "nanoid"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(length = 10): string {
  return nanoid(length)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
