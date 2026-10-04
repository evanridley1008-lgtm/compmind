import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import MobileNav from "../../components/layout/MobileNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <MobileNav />

          <main className="min-w-0 flex-1">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
