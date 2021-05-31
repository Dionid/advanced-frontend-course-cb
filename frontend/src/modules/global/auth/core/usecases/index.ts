import {Me} from "../../../me/core/entities";

export interface AuthRepoRegisterCmd {
  username: string
  email: string
  password: string
}

export interface AuthServiceLoginCmd {
  email: string
  password: string
}

export interface AuthRepoUpdateMyPasswordCmd {
  myId: string
  oldPassword: string
  newPassword: string
}

export interface AuthRepo {
  register(cmd: AuthRepoRegisterCmd): Promise<void>
  login(cmd: AuthServiceLoginCmd): Promise<void>
  clearToken(): Promise<void>

  updateMyPassword(cmd: AuthRepoUpdateMyPasswordCmd): Promise<void>
}

export interface MeRepository {
  clearMe(): Promise<void>
  getMe(): Promise<Me>
}
