import {Nominal} from "./index";

export type Email = Nominal<string, "Email">
export const Email = (value: string): Email => {
  if (!value.includes("@")) {
    throw new Error("")
  }
  return value as Email
}
