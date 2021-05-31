

export interface Message {
  id: string
  content: string
  createdAt: Date
  author: {
    id: string
    username: string
  }
}
