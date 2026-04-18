import { Pencil, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const Teachers = () => {
  return (
    <div className='w-full min-h-screen flex flex-col gap-20 p-7 lg:p-15'>
      <div className='w-full flex flex-wrap justify-between items-center gap-3'>
        <h1 className='text-3xl lg:text-4xl'>Predavači ({teachers.length})</h1>
        <button className='pt-2 pb-2 pl-7 pr-7 w-full lg:w-auto flex items-center justify-center cursor-pointer gap-2 rounded-full bg-black text-white'><Plus size={18}/> Novi predavač</button>
      </div>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {
          teachers.map((teacher: Teacher, index: number) => (
            <div key={index} className='p-4 rounded-xl flex flex-col items-center justify-center gap-3 bg-white shadow-md'>
              <Image src={teacher.image} alt={teacher.name} width={50} height={50} />
              <h2>{teacher.name}</h2>
              <p>{teacher.location}</p>
              <div className='flex flex-row gap-2'>
                {
                  teacher.languages.map((lang: string, index: number) => (
                    <p key={index} className='pt-1 pb-1 pl-3 pr-3 text-sm rounded-full bg-zinc-100'>{lang}</p>
                  ))
                }
              </div>
              <div className='flex flex-wrap gap-3 items-center w-full justify-end'>
                <Link href={`/predavac/${teacher.id}`} className='rounded-md cursor-pointer p-2 bg-zinc-200 hover:bg-zinc-300'><Pencil size={17} /></Link>
                <Link href={`/predavac/${teacher.id}`} className='rounded-md cursor-pointer p-2 bg-zinc-200 hover:bg-red-300 transition-all duration-200'><Trash size={17} /></Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Teachers;