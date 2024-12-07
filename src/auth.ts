import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { emailSchema, passwordSchema } from "../schema/credentials-schema";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        username: {type: "text"}
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please correctly fill the form and try again.");
        }
        console.log("cred is :", credentials);
        const emailValidation = emailSchema.safeParse(credentials.email);

        if (!emailValidation.success) {
          throw new Error("Invalid email format");
        }

        const passwordValidation = passwordSchema.safeParse(
          credentials.password
        );

        if (!passwordValidation.success) {
          throw new Error(passwordValidation.error.issues[0].message);
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: emailValidation.data,
            },
          });

          if(!user && !credentials.username){
            throw new Error("No username found");
          }

          if (!user) {
            const hashedPassword = await bcrypt.hash(
              passwordValidation.data,
              10
            );
            const newUser = await prisma.user.create({
              data: {
                email: emailValidation.data,
                name: credentials.username,
                password: hashedPassword,
                provider: "Credentials",
              },
            });
            return newUser;
          }

          if (!user?.password) {
            const hashedPassword = await bcrypt.hash(
              passwordValidation.data,
              10
            );
            const authUser = await prisma.user.update({
              where: {
                email: emailValidation.data,
              },
              data: {
                password: hashedPassword,
              },
            });
            return authUser;
          }

          const passwordVerification = await bcrypt.compare(
            passwordValidation.data,
            user.password
          );

          if (!passwordVerification) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          if (error instanceof PrismaClientInitializationError) {
            throw new Error("Internal server error");
          }
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth", // Specify the custom sign-in page (optional)
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });

        if (user) {
          session.user.id = user.id;
        }
      } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
          throw new Error("Internal server error");
        }
        console.log(error);
        throw error;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user?.email) {
        console.error("No email found in the user object");
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          console.log(`Creating new user with email: ${user.email}`);
          await prisma.user.create({
            data: {
              email: user.email,
              provider: "Google",
              avatarUrl: user.image,
            },
          });
        } else {
          console.log(`User with email ${user.email} already exists.`);
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }

      return true;
    },
  },
};
