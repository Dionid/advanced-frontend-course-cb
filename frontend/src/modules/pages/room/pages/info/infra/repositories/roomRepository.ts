import {Room, RoomMember} from "../../core/entities/room";
import {Subscription} from "libs/subscription";
import {gql} from "@apollo/client";
import {
  DeleteRoomMutation,
  DeleteRoomMutationVariables,
  EditRoomMutation,
  EditRoomMutationVariables,
  EnterRoomMutation,
  EnterRoomMutationVariables,
  SubscribeRoomPageDataSubscription
} from "libs/api/graphql";
import {RoomService as GlobalRoomService} from "../../../../../../global/rooms/core/entities/room"
import {v4} from "uuid";
import {MeId} from "../../../../../../global/me/core/entities";
import {GQLApi} from "libs/api/gqlApi";

const SUBSCRIBE_ROOM_PAGE_BY_ID = gql`
subscription SubscribeRoomPageData($id: uuid!) {
  room_by_pk(id: $id) {
    author_id
    created_at
    deleted_at
    description
    id
    name
    updated_at
    members {
      id
      updated_at
      user {
        username
        id
      }
    }
    author {
      id
      username
    }
  }
}
`

const ENTER_ROOM = gql`
mutation EnterRoom($user_id: uuid!, $room_id: uuid!, $id: uuid!) {
  insert_room_member_one(object: {room_id: $room_id, id: $id, user_id: $user_id}, on_conflict: {constraint: room_member_room_id_user_id_key, update_columns: updated_at}) {
    id
  }
}
`

const DELETE_ROOM = gql`
mutation DeleteRoom($room_id: uuid!, $deleted_at: timestamptz!) {
  update_room_by_pk(pk_columns: {id: $room_id}, _set: {deleted_at: $deleted_at}) {
    id
  }
}
`

const EDIT_ROOM = gql`
mutation EditRoom($id: uuid!, $name: String!, $description: String!) {
  update_room_by_pk(pk_columns: {id: $id}, _set: {name: $name, description: $description}) {
    id
  }
}
`

interface RoomRepositoryEditRoomCmd {
  roomId: string,
  name: string,
  description: string,
}

export class RoomRepository {
  constructor(
    private room: Room,
    private saveRoom: (room: Room) => void,
    private getMyId: () => MeId,
    private gqlApi: GQLApi,
  ) {
  }

  private sub?: Subscription

  public refresh(
    room: Room,
  ) {
    this.room = room
  }

  public subscribeOnRoomUpdate = async (id: string): Promise<void> => {
    // . Check if already subscribed
    if (this.sub) {
      return
    }

    // . If not cached than get it from API
    this.sub = this.gqlApi.subscribe<SubscribeRoomPageDataSubscription>({
      query: SUBSCRIBE_ROOM_PAGE_BY_ID,
      variables: {
        id,
      }
    }).subscribe((res) => {
      if (!res.data || !res.data.room_by_pk) {
        // TODO. Throw error
        return
      }
      const members: RoomMember[] = res.data.room_by_pk.members.map( m => {
          return {
            id: m.id,
            username: m.user.username,
            updatedAt: new Date(m.updated_at),
          }
        })
      const activeMembers = GlobalRoomService.createActiveMembers(members)
      const { room_by_pk } = res.data
      const room: Room = {
        id: room_by_pk.id,
        name: room_by_pk.name,
        description: room_by_pk.description || "",
        author: {
          id: room_by_pk.author.id,
          username: room_by_pk.author.username,
        },
        createdAt: new Date(room_by_pk.created_at),
        members,
        activeMembers,
        deleted: !!room_by_pk.deleted_at,
      }
      this.saveRoom(room)
    })
  }

  public unsubscribeRoomUpdate = async (): Promise<void> => {
    if (!this.sub) {
      // TODO. Push error
      return
    }
    this.sub.unsubscribe()
  }

  public enterRoom = async (roomId: string, userId: string) => {
    const variables = {
      user_id: userId,
      room_id: roomId,
      id: v4(),
    }
    try {
      await this.gqlApi.mutate<EnterRoomMutation, EnterRoomMutationVariables>({
        mutation: ENTER_ROOM,
        variables,
      })
    } catch (e) {
      debugger
    }
  }

  public getRoomData = async (): Promise<Room> => {
    return this.room
  }

  public deleteRoom = async (): Promise<void> => {
    try {
      debugger
      await this.gqlApi.mutate<DeleteRoomMutation, DeleteRoomMutationVariables>({
        mutation: DELETE_ROOM,
        variables: {
          room_id: this.room.id,
          deleted_at: new Date(),
        },
      })
    } catch (e) {
      debugger
    }
  }

  public editRoom = async (cmd: RoomRepositoryEditRoomCmd): Promise<void> => {
    try {
      await this.gqlApi.mutate<EditRoomMutation, EditRoomMutationVariables>({
        mutation: EDIT_ROOM,
        variables: {
          id: cmd.roomId,
          name: cmd.name,
          description: cmd.description,
        },
      })
    } catch (e) {
      debugger
    }
  }
}
