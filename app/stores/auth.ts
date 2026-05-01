import { create } from "zustand"

type AuthState = {
  accessToken: string
  expiresAt: number | null
  updateAccessToken: (token: string) => void
  setExpiresAt: (time: number) => void
}

const useAuthentication = create<AuthState>((set) => ({
  accessToken: "",
  expiresAt: null,

  updateAccessToken: (token) =>
    set({ accessToken: token }),

  setExpiresAt: (time) =>
    set({ expiresAt: time }),
}))

export default useAuthentication;