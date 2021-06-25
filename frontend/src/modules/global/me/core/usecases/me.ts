import {MeRepository} from "./index";

export interface MeUCUpdateMyInfoCmd {
  email: string
  username: string
}

export type MeUC = ReturnType<typeof MeUC>
export const MeUC = (meRepo: MeRepository) => ({
  updateMyInfo: async (cmd: MeUCUpdateMyInfoCmd): Promise<void> => {
    await meRepo.updateMyInfo(cmd)
    await meRepo.fetchMe()
  }
})
