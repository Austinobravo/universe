"use client"
import React from "react";
import Sidebar from "./_components/sidebar";
import { Menu, X } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = React.useState(true)
  React.useEffect(()=> {
    
  })
  return (
    <>
      <section className="flex  relative h-full">
        {!toggle ? 
        <div className=" absolute z-10  h-full ">
          <div className='flex  border-x-2 border-b-2 items-center space-x-2 py-4 ml-auto w-full cursor-pointer' onClick={() => setToggle(!toggle)}>
                <X size={35}/>
                {/* <Image src="/home/logo-no-background.png" width={100} height={100} alt="logo"/> */}

            </div>
          <Sidebar func={()=> setToggle(!toggle)}/>
        </div>
        :
        <div className="pt-10 md:pl-5 cursor-pointer" onClick={()=> setToggle(!toggle)}><Menu size={30}/></div>
        }
        <main className="pt-20 px-10 w-full">{children}</main>
      </section>
    </>
  );
};
export default AdminLayout;
