import Link from "next/link";

import { getServerSession } from "next-auth";
import { ModeToggle } from "@/components/modeToggle";
import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import Signout from "@/components/Signout";
import Supportbtn from "@/components/Supportbtn";
import { MdLogin } from "react-icons/md";


export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <header className="top-0 z-10 border-b-2 shadow-sm px-5">
      <div className="flex justify-between items-center max-w-8xl mx-auto py-2 px-2">
        <Link href={"/"}>
          <div className="border-4 border-primary px-2 py-1 text-xl text-primary font-bold tracking-wider">
            NextAuth
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <div>
            <ModeToggle />
          </div>
          <div>
            <Supportbtn />
          </div>
          <div>
            {session?.user?.email ? (
                <Signout/>
            ) : (
              <Link href={"/auth"} >
                <Button variant={"outline"} className="flex gap-1 items-center">
                  <span><MdLogin className="size-5"/></span>
                  Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
