
export type RoomId = string

export interface Room {
  id: RoomId
  author: {
    id: string
    username: string
  }
}

export interface RoomMember {
  updatedAt: Date
}

export class RoomService {
  public static createActiveMembers<T extends RoomMember>(members: T[]): T[] {
    const activeTime = new Date()
    activeTime.setMinutes(activeTime.getMinutes() - 10)
    return members.filter( m => {
      return m.updatedAt > activeTime
    })
  }
}
