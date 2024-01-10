
import Sidebar from "./_components/sidebar";
import { redirect, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  
  if(!user ) redirect("/signin")
  if (user.role !== "User") redirect("/dashboard")
  
  
    return (
      <>
        <section className="flex  relative h-full">
          <div className="absolute z-10 md:flex h-full ">
            <Sidebar />
          </div>
          <main className="pt-20 px-10 w-full">{children}</main>
        </section>
      </>
    );
  
  
};
export default UserLayout;
