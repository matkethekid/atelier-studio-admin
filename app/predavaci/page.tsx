import Sidebar from "@/components/Sidebar";
import Teachers from "@/components/Teachers";

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <main className="flex w-full min-h-screen flex-col lg:flex-row bg-white">
        <Sidebar />
        <Teachers />
      </main>
    </div>
  )
}

export default page;