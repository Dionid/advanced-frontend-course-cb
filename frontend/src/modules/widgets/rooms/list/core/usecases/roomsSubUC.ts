import {RoomsRepository, RoomsSubscriptionRepository} from "./index";
import {RoomID} from "../entities/rooms";

export class RoomsSubscriptionUC {
  constructor(
    private roomRepo: RoomsRepository,
    private roomsSubscriptionRepo: RoomsSubscriptionRepository,
  ) {

  }

  subscribeOnMultipleRoomUpdate = async (idArr: RoomID[]) => {
    for (let i = 0; i < idArr.length; i++) {
      await this.subscribeOnRoomUpdate(idArr[i])
    }
  }

  subscribeOnRoomUpdate = async (id: RoomID) => {
    // . Check if this room was not already subscribed
    const exist = this.roomsSubscriptionRepo.checkIfSubExist(id)
    if (exist) {
      return
    }

    // . Subscribe on changes
    this.roomsSubscriptionRepo.subscribeOnUpdatesByID(id, async (room) => {
      if (!room) return
      await this.roomRepo.update(room)
    })

    // . Watch sub
    // sub.subscribe()
  }

  stopAllSubscriptions = async () => {
    await this.roomsSubscriptionRepo.unsubscribeAll()
  }
}
