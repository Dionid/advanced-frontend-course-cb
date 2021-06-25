
export type MeId = string

export type Me = {
  id: MeId
  username: string
  email: string
  roles: string[]
  registrationDate?: Date
}
