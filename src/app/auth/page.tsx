import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { AuthCompoSec } from "./AuthCompoSec";
import Navbar from "../(main)/Navbar";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <AuthCompoSec />
      </div>
    </div>
  );
}
