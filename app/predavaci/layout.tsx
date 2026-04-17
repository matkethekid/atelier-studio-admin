import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier Studio | Predavaci",
  description: "Upravljajte predavacima"
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {children}
      </>
    )
};