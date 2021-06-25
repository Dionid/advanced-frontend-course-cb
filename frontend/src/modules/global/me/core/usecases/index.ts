import {MeUCUpdateMyInfoCmd} from "./me";

export type MeRepository = {
  fetchMe(): Promise<void>
  updateMyInfo(cmd: MeUCUpdateMyInfoCmd): Promise<void>
}
