import {Me} from "../entities";
import {MeUCUpdateMyInfoCmd} from "./me";


export interface MeRepository {
  getMe(): Promise<Me | undefined>
  fetchMe(): Promise<void>
  getOrFetchMe(): Promise<Me>
  clearMe(): Promise<void>
  updateMyInfo(cmd: MeUCUpdateMyInfoCmd): Promise<void>
}
