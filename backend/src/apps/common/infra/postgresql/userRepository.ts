import {Email, isEmail} from "../../../../libs/dddfn/casualTypes";
import {User, UserId} from "../../../../modules/authN/command/entities/user.aggregate";
import {Knex} from "knex";
import {UserModel, UserModelShape} from "./models";
import {HashedPassword} from "../../../../modules/authN/command/entities/password.vo";

export type UserRepository = ReturnType<typeof UserRepository>
export const UserRepository = (knex: Knex) => {
  return {
    getByEmail: async (emailProp: Email): Promise<User | undefined> => {
      const userModel: UserModelShape = await UserModel.query(knex)
        .where('email', emailProp)
        .first();

      return User({
        id: UserId(userModel.id),
        email: Email(userModel.email),
        password: HashedPassword(userModel.password),
      })
    },

    checkUserExistByEmail: async (email: Email): Promise<boolean> => {
      const userModel = await UserModel.query(knex)
        .where('email', email)
        .first();
      return !!userModel
    },

    create: async (user: User): Promise<void> => {
      const userModel = await UserModel.query(knex)
        .insert(user)
      console.log(userModel)
      return
    }
  }
}
