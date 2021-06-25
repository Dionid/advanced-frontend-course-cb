import {IncorrectUsernameError} from "../errors";
import {Validator} from "../../../../../libs/dddfn";


export const isUsernameValid = Validator<{username: string}>((ctx) => {
  const errors: Error[] = []
  if (ctx.username.length < 5) {
    errors.push(new IncorrectUsernameError("Username must be min 5 letters"))
  }
  return errors
})
