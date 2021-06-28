import {Nominal} from "./index";
import {ValidationError} from "./errors";

export class EmailIsInvalid extends ValidationError {}

export type Email = Nominal<string, "Email">
export const isEmail = (value: string): value is Email => {
  if (value.includes("@")) {
    throw new EmailIsInvalid("email must contain @")
  }
  return true
}
export const Email = (value: string): Email => {
  if (!isEmail(value)) {
    throw new Error("")
  }
  return value
}
