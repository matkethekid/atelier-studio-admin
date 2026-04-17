"use client";

import { useUser } from "@clerk/nextjs";
import { Clock, Star, UserCog } from "lucide-react";
import { ReactNode } from "react";

type CardColor = "blue" | "green" | "red";

interface Card { 
  id: number;
  name: string;
  icon: ReactNode;
  color: CardColor;
};

const cards: Card[] = [
  { id: 0, name: "Registrovani predavači", icon: <UserCog size={20} />, color: "blue" },
  { id: 1, name: "Recenzije", icon: <Star size={20} />, color: "green" },
  { id: 2, name: "Poslednji put viđen/a", icon: <Clock size={20} />, color: "red" },
];

const colorMap: Record<CardColor, {
  bar: string;
  iconBg: string;
  border: string;
}> = {
  blue: {
    bar: "bg-blue-500",
    iconBg: "bg-blue-500/20",
    border: "border-blue-500/50",
  },
  green: {
    bar: "bg-green-500",
    iconBg: "bg-green-500/20",
    border: "border-green-500/50",
  },
  red: {
    bar: "bg-red-500",
    iconBg: "bg-red-500/20",
    border: "border-red-500/50",
  },
};

const Dashboard = () => {
  const userObject = useUser();
  const user = userObject.user;
  const date = new Date();
  const currentHour = date.getHours();
  
  function generateGreeting() {
    if (currentHour < 12) {
      return "dobro jutro";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "dobar dan";
    } else {
      return "dobro veče"
    }
  };
  return (
    <div className='w-full min-h-screen bg-linear-to-br from-white via-zinc-50 to-zinc-100 p-5 flex flex-col gap-10'>
      <div className="w-full p-5 lg:p-7 rounded-xl border border-zinc-200/70 bg-white/40 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col gap-3 justify-start">
        <div>
          <p className="text-[0.8rem] uppercase">{generateGreeting()},</p>
          <p className="text-2xl">{user?.firstName} {user?.lastName}</p>
        </div>
        <p className="text-sm">Dobrodošli u Atelier Studio admin panel.</p>
      </div>
      <div className="w-full flex flex-row gap-5 justify-start items-center">
        {cards.map((card: Card, index: number) => {
          const color = colorMap[card.color];
          return (
            <div key={index} className="w-full lg:w-1/2 relative bg-white/70 shadow-sm rounded-lg flex items-center gap-3 pt-4 pb-4 pl-3 pr-3 overflow-hidden">
              <div className={`absolute left-0 top-0 h-full w-1 ${color.bar} rounded-l-xl`} />
              <div className={`p-2 rounded-lg ${color.iconBg} ${color.border} z-10 flex items-center justify-center`}>
                {card.icon}
              </div>
              <div className="flex flex-col">
                <p>1</p>
                <p className="text-[0.9rem] text-gray-600">{card.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Dashboard;