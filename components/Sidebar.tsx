"use client";

import { useState } from "react";
import { SignOutButton, UserAvatar, useUser } from "@clerk/nextjs";
import { Home, LogOut, Star, UserCog, X, Menu } from "lucide-react";
import { Prata } from "next/font/google";
import Link from "next/link";

const prata = Prata({
    subsets: ["latin"],
    weight: ["400"]
});

const links = [
    { id: 0, name: "Početna", icon: <Home size={20}/>, path: "/" },
    { id: 1, name: "Predavači", icon: <UserCog size={20}/>, path: "/" },
    { id: 2, name: "Recenzije", icon: <Star size={20}/>, path: "/" },
]

const Sidebar = () => {
    const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

    const userObject = useUser();
    if (!userObject) {
        return;
    }
    const user = userObject.user;
  return (
    <aside className='w-full lg:max-w-[320px] min-h-screen bg-white flex flex-col justify-between gap-3 border-gray-300 border border-l-transparent'>
        <div className="hidden lg:flex justify-between flex-col h-full">
            <div className="flex flex-col gap-5 pt-5 pb-4 pl-5 pr-5">
                <div>
                    <p className={`${prata.className} text-lg`}>Atelier Studio</p>
                </div>
                <div className='w-full h-px bg-gray-300'></div>
                <ul className="flex flex-col gap-4 mt-3">
                    {
                        links.map((link, index: number) => (
                            <li key={index}><Link href={link.path} className="flex gap-3">{link.icon} {link.name}</Link></li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex flex-row gap-2 justify-between items-center border p-3">
                <div className="flex flex-row gap-2 items-center">
                    <UserAvatar/>
                    <p>{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <SignOutButton><LogOut size={20} className="text-gray-500 cursor-pointer"/></SignOutButton>
            </div>
        </div>
        <div className="flex flex-row lg:hidden justify-between items-center p-5">
            <p className="text-lg">Atelier Studio</p>
            <button onClick={() => setActiveSidebar(prev => !prev)}>{activeSidebar ? <X/> : <Menu/>}</button>
        </div>
        <div className={`flex w-full h-full flex-1 bg-zinc-50 transform transition-transform duration-300 ease-in-out ${activeSidebar ? "translate-x-0" : "translate-x-full"}`}>
            <ul className="flex flex-col gap-4 mt-3 justify-center items-center w-full">
                {
                    links.map((link, index: number) => (
                        <li key={index}><Link href={link.path} className="flex gap-3">{link.icon} {link.name}</Link></li>
                    ))
                }
            </ul>
        </div>
    </aside>
  )
}

export default Sidebar;