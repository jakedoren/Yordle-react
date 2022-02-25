import { createContext, useContext } from "react"
export type GlobalContent = {
  isLoggedIn: boolean
  setAuth:(c: boolean) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
isLoggedIn: false, // set a default value
setAuth: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)