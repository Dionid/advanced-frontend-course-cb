import {IncorrectRoomDescriptionError, IncorrectRoomNameError} from "../errors";
import {ValidationChecker} from "libs/validationChecker";
import {staticImplements} from "libs/staticImplements";

@staticImplements<ValidationChecker>()
export class IsRoomNameValid {
  public static check(username: string) {
    const errors: Error[] = []
    if (username.length < 5) {
      errors.push(new IncorrectRoomNameError("Name must be min 5 letters"))
    }
    return errors
  }
}

@staticImplements<ValidationChecker>()
export class IsRoomDescriptionValid {
  public static check(username: string) {
    const errors: Error[] = []
    if (username === "") {
      return []
    }
    if (username.length < 5) {
      errors.push(new IncorrectRoomDescriptionError("Description must be min 5 letters"))
    }
    return errors
  }
}
