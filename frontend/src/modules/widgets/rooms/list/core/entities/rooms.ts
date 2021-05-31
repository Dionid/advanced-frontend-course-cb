import {Maybe} from "graphql/jsutils/Maybe";
import {RoomService as GlobalRoomService} from "modules/global/rooms/core/entities/room"

export type RoomID = string

export interface RoomMember {
  userId: string
  updatedAt: Date
}

export interface RoomAuthor {
  username: string
  id: string
}

export interface Room {
  id: RoomID
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Maybe<Date>
  author: RoomAuthor,
  members: RoomMember[]
  activeMembers: RoomMember[]
}

export class RoomService {
  static newRoom(props: {
    id: RoomID,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Maybe<Date>,
    author: RoomAuthor,
    members: RoomMember[],
  }): Room {
    const {
      id,
      name,
      description,
      createdAt,
      updatedAt,
      deletedAt,
      author,
      members,
    } = props
    const activeMembers = GlobalRoomService.createActiveMembers(members)
    return {
      id,
      name,
      description,
      createdAt,
      updatedAt,
      deletedAt,
      activeMembers,
      members,
      author,
    }
  }
}
