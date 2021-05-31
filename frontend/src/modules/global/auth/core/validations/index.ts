import {IncorrectPasswordError} from "../errors";

export class IsPasswordValid {
  public static check(password: string): Error[] {
    const errors: Error[] = []
    if (password.length < 5) {
      errors.push(new IncorrectPasswordError("Password must be min 5 letters"))
    }
    return errors
  }
}
