
export type MeId = string

export interface Me {
  id: MeId
  username: string
  email: string
  roles: string[]
  registrationDate?: Date
}
