import { create } from "zustand"

type UserState = {
  email: string
  setEmail: (email: string) => void
};

const useUser = create<UserState>((set) => ({
  email: "",

  setEmail: (email) =>
    set({ email: email }),
}));

export default useUser;