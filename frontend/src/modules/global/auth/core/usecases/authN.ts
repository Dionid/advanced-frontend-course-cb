import {AuthRepo, MeRepository} from "./index";

export interface RegisterCmd {
  username?: string
  email: string
  password: string
}

export interface LoginCmd {
  email: string
  password: string
}

export interface AuthNUCUpdateMyPasswordCmd {
  oldPassword: string
  newPassword: string
}

export class AuthNUC {
  constructor(
    private authRepo: AuthRepo,
    private meRepo: MeRepository,
  ) {
  }

  public register = async (cmd: RegisterCmd): Promise<void> => {
    // . Register new user by repository
    try {
      await this.authRepo.register({
        ...cmd,
        username: cmd.username || cmd.email,
      })
    } catch (e) {
      throw e
    }
  }

  public login = async (cmd: LoginCmd): Promise<void> => {
    // . Validate email and password (throw error if not correct)
    // ...

    // . Get user from repository
    try {
      await this.authRepo.login(cmd)
    } catch (e) {
      throw e
    }
  }

  public logout = async (): Promise<void> => {
    await this.authRepo.clearToken()
    await this.meRepo.clearMe()
  }

  updateMyPassword = async (cmd: AuthNUCUpdateMyPasswordCmd): Promise<void> => {
    const me = await this.meRepo.getMe()
    // TODO. Think about how to refactor this cmd
    await this.authRepo.updateMyPassword({
      ...cmd,
      myId: me.id,
    })
  }
}
