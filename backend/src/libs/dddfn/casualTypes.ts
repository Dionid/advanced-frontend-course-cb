import {ValidationError} from "./errors";
import {Nominal} from "../nominal";

export class EmailIsInvalid extends ValidationError {}

const EmailToken = Symbol("Email")
export type Email = Nominal<string, typeof EmailToken>
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
