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
  getByEmail(email: Email): ResultP<User | undefined>
}

class IncorrectPasswordOrEmail extends Error {
  constructor() {
    super("User already exist");
  }
}

const login = (userRepo: UserRepository) => async (cmd: LoginCommand): ResultP<Token, IncorrectPasswordOrEmail> => {
  // . Check if exist
  const [user, err] = await userRepo.getByEmail(cmd.email)
  if (err) {
    // TODO. Do something
    return [undefined, err]
  }
  if (!user) {
    return [undefined, new IncorrectPasswordOrEmail()]
  }

  const hashedPassword = HashedPassword(cmd.password)

  if (hashedPassword !== user.password) {
    return [undefined, new IncorrectPasswordOrEmail()]
  }

  // . Create token
  const token = Token(
    user.id,
    user.email,
  )

  // . Send it
  return [token]
}

export default login
