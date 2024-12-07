// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@prisma/client"; // Import Prisma User if you're using Prisma

declare module "next-auth" {
  interface User extends PrismaUser {
    id: string; // Add the `id` property from your Prisma User model (or whatever type you're using)
  }

  interface Session extends DefaultSession {
    user: User; // Ensure that the session has the updated `user` type
  }
}
