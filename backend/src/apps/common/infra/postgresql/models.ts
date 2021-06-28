import {Model, ModelObject} from "objection";


export interface UserModel {
  id: string
  email: string
  password: string
}
export class UserModel extends Model {
  static get tableName(): string {
    return "user"
  }
}
export type UserModelShape = ModelObject<UserModel>
