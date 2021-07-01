import {Email} from "libs/dddfn/casualTypes";
import {HashedPassword, Password} from "../../entities/password.vo";
import {User, UserId} from "../../entities/user.aggregate";

export type RegisterCommand = {
  email: Email
  password: Password
}

type UserRepository = {
  checkUserExistByEmail(email: Email): Promise<boolean>
  create(user: User): Promise<void>
}

class UserAlreadyExist extends Error {
  constructor() {
    super("User already exist");
  }
}

export const register = (userRepo: UserRepository) => async (cmd: RegisterCommand): Promise<void> => {
  // . Check if exist
  const exist = await userRepo.checkUserExistByEmail(cmd.email)
  if (exist) {
    throw new UserAlreadyExist()
  }

  // . If not, than create User
  const user = User.create({
    id:  UserId.new(),
    email: cmd.email,
    password: HashedPassword.create(cmd.password),
  })

  // . Create user in repo
  await userRepo.create(user)
}

export default register
