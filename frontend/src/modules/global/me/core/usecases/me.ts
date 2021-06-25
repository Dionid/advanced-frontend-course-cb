import {MeRepository} from "./index";

export interface MeUCUpdateMyInfoCmd {
  email: string
  username: string
}

export class MeUC {
  constructor(
    private meRepo: MeRepository,
  ) {}

  updateMyInfo = async (cmd: MeUCUpdateMyInfoCmd): Promise<void> => {
    await this.meRepo.updateMyInfo(cmd)
    await this.meRepo.fetchMe()
  }
}
