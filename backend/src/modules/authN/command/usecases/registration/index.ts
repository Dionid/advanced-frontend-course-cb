import {Email} from "libs/dddfn/casualTypes";
import {HashedPassword, Password} from "../../aggregates/password.vo";
import {Token, User} from "../../aggregates/user.aggregate";
import {v4} from "uuid";
import {ResultP, SimpleResultP} from "../../../../../libs/dddfn/errors";

type LoginCommand = {
  email: Email
  password: Password
}

type UserRepository = {
  checkUserExistByEmail(email: Email): ResultP<boolean>

  create(user: User): SimpleResultP
}

class UserAlreadyExist extends Error {
  constructor() {
    super("User already exist");
  }
}

const register = (userRepo: UserRepository) => async (cmd: LoginCommand): SimpleResultP<UserAlreadyExist> => {
  // . Check if exist
  const [exist, err] = await userRepo.checkUserExistByEmail(cmd.email)
  if (err) {
    // TODO. Do something
    return err
  }
  if (exist) {
    return new UserAlreadyExist()
  }

  // . If not, than create User
  const [user, uErr] = User({
    id: v4(),
    email: cmd.email,
    password: HashedPassword(cmd.password),
  })
  if (uErr) {
    // TODO. Do something
    return uErr
  }

  // . Create user in repo
  const createErr = await userRepo.create(user)
  if (createErr) {
    return createErr
  }

  // . Send it
  return
}

export default register
