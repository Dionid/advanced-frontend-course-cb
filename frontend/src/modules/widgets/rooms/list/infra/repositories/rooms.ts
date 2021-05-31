import {Room, RoomID} from "../../core/entities/rooms";
import {RoomsState, RoomsStateEntities} from "../../ui/contexts/RoomListWidgetContext";


interface API {
  fetchRoomsBySearchParams (
    page: number,
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ): Promise<[Room[], number]>
}

export class RoomsRepository {
  constructor(
    private state: RoomsState,
    private saveState: (state: RoomsState) => void,
    private api: API,
  ) {
  }

  public refreshState(
    state: RoomsState,
  ) {
    this.state = state
  }

  fetchRoomsBySearchParams = async (
    page: number,
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ): Promise<[Room[], number]> => {
    // . Get data from api
    const result = await this.api.fetchRoomsBySearchParams(
      page,
      search,
      myRooms,
      withMe,
      notEmpty,
    )

    // TODO. Make it more accurate
    this.state = {
      allIds: [
        ...this.state.allIds,
        ...result[0].filter(room => this.state.allIds.indexOf(room.id) === -1).map(room => room.id)
      ],
      entities: {
        ...this.state.entities,
        ...result[0].reduce((sum, room) => {
          sum[room.id] = room
          return sum
        }, {} as RoomsStateEntities)
      }
    }
    this.saveState(this.state)

    return result
  }

  getRoomById = async (id: RoomID): Promise<Room> => {
    return this.state.entities[id]
  }

  update = async (room: Room): Promise<void> => {
    this.state = {
      ...this.state,
      entities: {
        ...this.state.entities,
        [room.id]: {
          ...room,
        },
      }
    }
    this.saveState(this.state)
  }
}
