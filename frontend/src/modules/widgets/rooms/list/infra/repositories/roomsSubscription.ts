import {Room, RoomID, RoomService} from "../../core/entities/rooms";
import {gql} from "@apollo/client";
import {NewRoomSubscriptionSubscription, RoomUpdateSubscriptionSubscription} from "libs/api/graphql";
import {Subscription} from "libs/subscription";
import {Observable} from "@apollo/client/utilities";
import {FetchResult} from "@apollo/client/link/core";
import {GQLApi} from "libs/api/gqlApi";

const ROOM_UPDATE_SUBSCRIPTION = gql`
subscription RoomUpdateSubscription($room_id: uuid!) {
  room_by_pk(id: $room_id) {
    updated_at
    name
    id
    description
    deleted_at
    created_at
    author_id
    members {
      id
      updated_at
      user_id
    }
  }
}
`

interface Api {
  subscribeOnNewRoomUpdate(
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ): Observable<FetchResult<NewRoomSubscriptionSubscription>>
}

export class RoomsSubscriptionRepository {
  constructor(
    private api: Api,
    private gqlApi: GQLApi,
  ) {
  }

  private subs: { [key: string]: Subscription } = {}

  private newRoomSub: Subscription | null = null

  subscribeOnNewRoomUpdate = (
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean,
    callback: () => void
  ) => {
    const obs = this.api.subscribeOnNewRoomUpdate(
      search,
      myRooms,
      withMe,
      notEmpty,
    )

    this.newRoomSub = obs.subscribe(callback)
  }

  unsubscribeOnNewRoomUpdate = () => {
    if (this.newRoomSub) {
      this.newRoomSub.unsubscribe()
      this.newRoomSub = null
    }
  }

  subscribeOnUpdatesByID = (id: RoomID, callback: (room?: Room) => Promise<void>): void => {
    try {
      const sub = this.gqlApi.subscribe<RoomUpdateSubscriptionSubscription>({
        query: ROOM_UPDATE_SUBSCRIPTION,
        variables: {
          room_id: id,
        }
      })

      this.subs[id] = sub.map((result) => {
        const {room_by_pk} = result.data as RoomUpdateSubscriptionSubscription
        if (!room_by_pk) {
          return
        }
        return RoomService.newRoom({
          id: room_by_pk.id,
          name: room_by_pk.name,
          description: room_by_pk.description || "",
          createdAt: new Date(room_by_pk.created_at),
          deletedAt: room_by_pk.deleted_at ? new Date(room_by_pk.deleted_at) : null,
          updatedAt: new Date(room_by_pk.updated_at),
          author: room_by_pk.author_id,
          members: room_by_pk.members.map( m => ({ updatedAt: new Date(m.updated_at), userId: m.user_id})),
        })
      }).subscribe(callback)
    } catch (e) {
      debugger
    }
  }

  unsubscribeAll = async (): Promise<void> => {
    Object.keys(this.subs).forEach((id) => {
      this.subs[id].unsubscribe()
    })
    this.unsubscribeOnNewRoomUpdate()
  }

  checkIfSubExist = (id: RoomID): boolean => {
    return !!this.subs[id]
  }
}
