import { create } from "zustand"



type State = {
  password: string
}

type Actions = {
  setPassword: (password: string) => void
}

export const usePasswordStore = create<State & Actions>((set) => ({
  password: "",
  setPassword: (password: string) => set(() => ({ password }))
}))