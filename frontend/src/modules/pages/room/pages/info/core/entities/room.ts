import { Room as GRoom } from "../../../../../../global/rooms/core/entities/room"

export interface RoomMember {
  id: string
  username: string
  updatedAt: Date
}

export interface Room extends GRoom {
  name: string
  description: string
  createdAt: Date
  members: RoomMember[]
  activeMembers: RoomMember[]
  deleted: boolean
}
