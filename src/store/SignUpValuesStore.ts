import { create } from "zustand"



type State = {
  username: string
  email: string
  password: string
  confirmedPassword: string
}

type Actions = {
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmedPassword: (confirmedPassword: string) => void
  setEmptySignUpFormValues: () => void
}

export const useSignUpValuesStore = create<State & Actions>((set) => ({
  username: "",
  email: "",
  password: "",
  confirmedPassword: "",
  setUsername: (username: string) => set(() => ({ username })),
  setEmail: (email: string) => set(() => ({ email })),
  setPassword: (password: string) => set(() => ({ password })),
  setConfirmedPassword: (confirmedPassword: string) => set(() => ({ confirmedPassword })),
  setEmptySignUpFormValues: () => set(() => ({ username: "", email: "", password: "", confirmedPassword: "" }))
}))