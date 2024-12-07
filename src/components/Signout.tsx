'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Signout() {
  return (
    <div>
      <Button onClick={async() => signOut({
        redirect:true,
        callbackUrl: "/auth"
      })}>Logout</Button>
    </div>
  )
}
