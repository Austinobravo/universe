import Sidebar from "./_components/sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
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
