// import { getServerSession } from "next-auth";
import Navbar from "./Navbar";
import Providers from "./Provider";
// import { authOptions } from "@/auth";
// import { redirect } from "next/navigation";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const session = await getServerSession(authOptions);
  // console.log("Current session ", session?.user)

  // if(!session?.user) {
  //   redirect("/")
  // }
  return (
    <Providers>
      <div className="flex flex-col tracking-wider">
        <div className="min-h-screen">
          <Navbar />
          <div className="flex flex-col grow gap-5 p-5 mx-10">
            {children}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      {/* <Toaster position="bottom-right" reverseOrder={false}  toastOptions={{duration: 1500, style: {
        padding: '16px'
      }}}  /> */}
    </Providers>
  );
}