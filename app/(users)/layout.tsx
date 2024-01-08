import Sidebar from "./_components/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex   h-full">
        <div className=" md:flex h-full ">
          <Sidebar />
        </div>
        <main className="pt-20 px-10 w-full">{children}</main>
      </section>
    </>
  );
};
export default AdminLayout;
