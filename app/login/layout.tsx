import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier Studio | Login",
  description: "Ulogujte se na vaš nalog"
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {children}
      </>
    )
};