import { Room } from "../entities/room"


export const canUserCreateRoom = (isAuthenticated: () => boolean) => {
  return isAuthenticated()
}

export const canUserEditRoom = (userId: string, room: Room) => {
  return room.author.id === userId
}

export const canUserDeleteRoom = (userId: string, room: Room) => {
  return room.author.id === userId
}
