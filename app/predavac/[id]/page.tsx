import DashboardSkeleton from "@/components/DashboardSkeleton";
import IndividualTeacher from "@/components/IndividualTeacher";
import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";

interface Teacher {
  id: number;
  name: string;
  image: string;
  location: string;
  languages: string[];
};

const teachers: Teacher[] = [
  {
    id: 0,
    name: "Dunja Stoev",
    image: "/dunjastoev.jpg",
    location: "Pančevo, Srbija",
    languages: ["Italijanski", "Francuski"]
  },
];

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <section className="min-h-screen w-full">
      <main className="flex w-full min-h-screen flex-col lg:flex-row bg-white">
        <Sidebar />
        <Suspense fallback={<DashboardSkeleton />}>
          <DroneDataLoader params={params} />
        </Suspense>
      </main>
    </section>
  );
};

async function DroneDataLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CachedDroneFetch id={id} />;
};

async function CachedDroneFetch({ id }: { id: string }) {
  //const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/drones/getbypreferredurl/${encodeURIComponent(id)}`);
  //if (!response.ok) return <div className="p-20 text-center">Drone not found</div>;
  //const data = await response.json();
  
  return <IndividualTeacher teacher={teachers[0]} />;
};

export default page;