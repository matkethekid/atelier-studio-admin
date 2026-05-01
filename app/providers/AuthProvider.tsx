"use client"

import { useEffect } from "react"

export function AuthProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    // silent refresh logic
  }, [])

  return children
};