import {AuthNRepository, MeRepository} from "./index";
import {Me} from "../entities";


export class NotAuthed extends Error {
  constructor() {
    super("User is not authenticated");
  }
}

export interface MeUCUpdateMyInfoCmd {
  email: string
  username: string
}

export class MeUC {
  constructor(
    private meRepo: MeRepository,
    private authNRepo: AuthNRepository,
  ) {

  }

  getOrFetchMe = async (): Promise<Me> => {
    const isAuthed = this.authNRepo.isAuthenticated()
    if (!isAuthed) {
      throw new NotAuthed()
    }
    return await this.meRepo.getOrFetchMe()
  }

  fetchMe = async (): Promise<void> => {
    const isAuthed = this.authNRepo.isAuthenticated()
    if (!isAuthed) {
      throw new NotAuthed()
    }
    await this.meRepo.fetchMe()
  }

  updateMyInfo = async (cmd: MeUCUpdateMyInfoCmd): Promise<void> => {
    await this.meRepo.updateMyInfo(cmd)
    await this.meRepo.fetchMe()
  }
}
