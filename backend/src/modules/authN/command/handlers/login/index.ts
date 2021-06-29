import {Email} from "libs/dddfn/casualTypes";
import {HashedPassword, Password} from "../../core/password.vo";
import {Token, User} from "../../core/user.aggregate";


export type LoginCommand = {
  email: Email
  password: Password
}

type UserRepository = {
  getByEmail(email: Email): Promise<User | undefined>
}

class IncorrectPasswordOrEmail extends Error {
  constructor() {
    super("User already exist");
  }
}

export const login = (userRepo: UserRepository) => async (cmd: LoginCommand): Promise<Token> => {
  // . Check if exist
  const user = await userRepo.getByEmail(cmd.email)
  if (!user) {
    throw new IncorrectPasswordOrEmail()
  }

  const hashedPassword = HashedPassword(cmd.password)

  if (hashedPassword !== user.password) {
    throw new IncorrectPasswordOrEmail()
  }

  // . Create token
  const token = Token(
    user.id,
    user.email,
  )

  // . Send it
  return token
}

export default login
