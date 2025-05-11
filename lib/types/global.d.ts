export {};

// Create a type for the roles
export type Roles = "USER" | "MODERATOR" | "ADMIN";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export type UserData = {
  username: string;
  email: string;
  imageUrl: string;
  role: Roles;
};

export type SecureLinkType = "TEXT" | "FILE"

export interface SecureLink {
  id: string
  userId: string
  type: SecureLinkType
  title?: string
  content?: string
  fileUrl?: string
  expiresAt?: Date
  maxViews: number
  currentViews: number
  createdAt: Date
}

export interface User {
  id: string
  email: string
  plan: "FREE" | "LIFETIME"
  credits: number
}
