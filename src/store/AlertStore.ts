import { create } from "zustand"



type State = {
  text: string
  isVisible: boolean
}

type Actions = {
  showAlert: (text: string) => void
}

export const useAlertStore = create<State & Actions>((set) => ({

  text: "",
  isVisible: false,

  showAlert: (text: string) => {
    set(() => ({ text: text, isVisible: true }))
    setTimeout(() => {
      set(() => ({ isVisible: false }))
    }, 10000)
  }
}))
