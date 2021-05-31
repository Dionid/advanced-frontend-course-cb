import {ActiveFilters} from "../entities/search";
import {Room, RoomID} from "../entities/rooms";


export interface MainRepository {
  getActiveFilters(): Promise<ActiveFilters>

  fetchRoomsBySearch(activeFilters: ActiveFilters): Promise<Room[]>

  saveActiveFilters(activeFilters: ActiveFilters): Promise<void>
  searchByActiveFilters(activeFilters: ActiveFilters): Promise<void>
}

export interface RoomsSubscriptionRepository {
  subscribeOnUpdatesByID(id: RoomID, callback: (room?: Room) => Promise<void>): void
  unsubscribeAll(): Promise<void>
  checkIfSubExist(id: RoomID): boolean
  subscribeOnNewRoomUpdate(
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean,
    callback: () => void
  ): void
  unsubscribeOnNewRoomUpdate(): void
}

// TODO. Разделить на SubscribtionRepository
export interface RoomsRepository {
  getRoomById(id: RoomID): Promise<Room>

  fetchRoomsBySearchParams(page: number,
                           search: string,
                           myRooms: boolean,
                           withMe: boolean,
                           notEmpty: boolean
  ): Promise<[Room[], number]>

  update(room: Room): Promise<void>
}
