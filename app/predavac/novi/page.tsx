import Sidebar from "@/components/Sidebar";
import NewTeacher from "@/components/NewTeacher";

const page = () => {
  return (
    <main className="flex w-full min-h-screen flex-col lg:flex-row bg-white">
      <Sidebar />
      <NewTeacher/>
    </main>
  )
}

export default page;