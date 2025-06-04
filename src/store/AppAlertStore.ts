import { create } from "zustand"



type State = {
  text: string
  isVisible: boolean
}

type Actions = {
  showAlert: (text: string) => void
  hideAlert: () => void
}

export const useAppAlertStore = create<State & Actions>((set) => ({

  text: "",
  isVisible: false,

  showAlert: (text: string) => set(() => ({ text: text, isVisible: true })),

  hideAlert: () => {
    set(() => ({ isVisible: false }))
    setTimeout(() => {
      set(() => ({ text: "" }))
    }, 500)
  },
}))
