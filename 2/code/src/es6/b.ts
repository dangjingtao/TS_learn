import { c } from "./c"

export const b: Function = (): string => {
  c()
  console.log("module b")
  return "b"
}
