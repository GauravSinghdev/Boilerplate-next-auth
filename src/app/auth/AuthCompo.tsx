"use client";

import { MemberCompo } from "@/components/memberCompo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export function AuthCompo() {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">LOGIN</TabsTrigger>
          <TabsTrigger value="password">REGISTER</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="py-5">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="johndoe@domain.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input id="username" placeholder="johndoe@123_" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Confirm Password</Label>
                <Input id="username" placeholder="johndoe@123_" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full tracking-widest">login</Button>
            </CardFooter>
            {/* or link */}
            <div className="flex gap-2 items-center">
              <div className="w-1/2 border"></div>
              <span className="px-2">Or</span>
              <div className="w-1/2 border"></div>
            </div>
            {/* Google and GitHub Login Buttons */}
            <div className="space-y-2 mt-4">
              <Button
                className="w-full tracking-wider"
                variant="outline"
                onClick={() =>
                  signIn("google", {
                    redirect: false,
                    callbackUrl: "/dashboard",
                  })
                }
              >
                Login with Google{" "}
                <span>
                  <FcGoogle />
                </span>
              </Button>
              <Button
                className="w-full tracking-wider"
                variant="outline"
                onClick={() => signIn("github")}
              >
                Login with GitHub{" "}
                <span>
                  <FaGithub />
                </span>
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="py-5">
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="johndoe@domain.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input id="username" placeholder="johndoe@123_" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full tracking-widest">Signup</Button>
            </CardFooter>
            {/* or link */}
            <div className="flex gap-2 items-center">
              <div className="w-1/2 border"></div>
              <span className="px-2">Or</span>
              <div className="w-1/2 border"></div>
            </div>
            {/* Google and GitHub Login Buttons */}
            <div className="space-y-2 mt-4">
              <Button
                className="w-full tracking-wider"
                variant="outline"
                onClick={() => signIn("google")}
              >
                Continue with Google{" "}
                <span>
                  <FcGoogle />
                </span>
              </Button>
              <Button
                className="w-full tracking-wider"
                variant="outline"
                onClick={() => signIn("github")}
              >
                Continue with GitHub{" "}
                <span>
                  <FaGithub />
                </span>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <MemberCompo />
    </div>
  );
}
