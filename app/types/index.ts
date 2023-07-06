import { User } from "@prisma/client";

/**
 * Sanitize User type for clinet component
 */
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
