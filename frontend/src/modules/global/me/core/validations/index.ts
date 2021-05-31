import {IncorrectUsernameError} from "../errors";


export class IsUsernameValid {
  public static check(username: string) {
    const errors: Error[] = []
    if (username.length < 5) {
      errors.push(new IncorrectUsernameError("Username must be min 5 letters"))
    }
    return errors
  }
}
