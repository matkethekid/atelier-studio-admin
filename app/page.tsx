import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <main className="flex w-full min-h-screen flex-col lg:flex-row bg-white">
        <Sidebar/>
        <Dashboard/>
      </main>
    </div>
  );
}
