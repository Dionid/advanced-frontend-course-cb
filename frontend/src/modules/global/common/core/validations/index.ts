import {IncorrectPasswordError} from "../../../auth/core/errors";


export class IsEmailValid {
  public static check(email: string): Error[] {
    const errors: Error[] = []
    if (!email.includes("@") || !email.includes(".")) {
      errors.push(new IncorrectPasswordError("Incorrect email"))
    }
    return errors
  }
}
