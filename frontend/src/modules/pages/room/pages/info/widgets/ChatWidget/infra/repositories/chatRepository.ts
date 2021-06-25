import {MessageModel, messagesReducer, messagesSlice} from "../redux";
import {EntityState} from "@reduxjs/toolkit";
import {Message} from "../../core/entities";
import {Dispatch, ReducerAction} from "react";
import {Subscription} from "libs/subscription";
import {gql} from "@apollo/client";
import {
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
  EditMessageMutation,
  EditMessageMutationVariables,
  MessageSubscriptionSubscription,
  NewMessageMutation,
  NewMessageMutationVariables
} from "libs/api/graphql";
import {v4} from "uuid";
import {GQLApi} from "libs/api/gqlApi";


const MESSAGE_SUBSCRIPTION = gql`
subscription MessageSubscription($room_id: uuid!) {
  message(where: {room_id: {_eq: $room_id}}) {
    body
    created_at
    id
    room_id
    updated_at
    author {
      id
      username
    }
  }
}`

const NEW_MESSAGE = gql`
mutation NewMessage($author_id: uuid!, $body: String!, $id: uuid!, $room_id: uuid!) {
  insert_message_one(object: {author_id: $author_id, body: $body, id: $id, room_id: $room_id}) {
    id
  }
}
`

const DELETE_MESSAGE = gql`
mutation DeleteMessage($id: uuid!) {
  delete_message_by_pk(id: $id) {
    id
  }
}
`

const EDIT_MESSAGE = gql`
mutation EditMessage($id: uuid!, $body: String!) {
  update_message_by_pk(pk_columns: {id: $id}, _set: {body: $body}) {
    id
  }
}
`

export interface ChatRepositoryCreateNewMessageCmd {
  body: string
  authorId: string
  roomId: string
}

export interface ChatRepositoryEditMessageCmd {
  messageId: string
  body: string
}

export class ChatRepository {
  constructor(
    private messages: EntityState<MessageModel>,
    private dispatchMessagesStore: Dispatch<ReducerAction<typeof messagesReducer>>,
    private gqlApi: GQLApi,
  ) {
  }

  private sub?: Subscription

  public refresh(
    messages: EntityState<MessageModel>,
  ) {
    this.messages = messages
  }

  public subscribeOnMessages = async (roomId: string): Promise<void> => {
    this.sub = this.gqlApi.subscribe<MessageSubscriptionSubscription>({
      query: MESSAGE_SUBSCRIPTION,
      variables: {
        room_id: roomId,
      }
    }).subscribe(async (res) => {
      if (!res.data) {
        return
      }
      const messages: MessageModel[] = res.data.message.map( m => {
        return {
          id: m.id,
          author: m.author,
          content: m.body,
          createdAt: new Date(m.created_at)
        }
      }).sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime()
      })
      await this.dispatchMessagesStore(messagesSlice.actions.upsertMany(messages))
    })
  }

  public unsubscribe = async (): Promise<void> => {
    if (this.sub) this.sub.unsubscribe()
  }

  public editMessage = async (cmd: ChatRepositoryEditMessageCmd): Promise<void> => {
    // . Send it to API
    try {
      await this.gqlApi.mutate<EditMessageMutation, EditMessageMutationVariables>({
        mutation: EDIT_MESSAGE,
        variables: {
          id: cmd.messageId,
          body: cmd.body,
        }
      })
    } catch (e) {
      debugger
    }
  }

  public createNewMessage = async (cmd: ChatRepositoryCreateNewMessageCmd): Promise<void> => {
    // . Optimistic update
    // await this.dispatchMessagesStore(messagesSlice.actions.addOne(message))

    // . Send it to API
    try {
      await this.gqlApi.mutate<NewMessageMutation, NewMessageMutationVariables>({
        mutation: NEW_MESSAGE,
        variables: {
          id: v4(),
          author_id: cmd.authorId,
          body: cmd.body,
          room_id: cmd.roomId,
        }
      })
    } catch (e) {
      debugger
    }
  }

  public deleteMessage = async (messageId: string) => {
    try {
      await this.gqlApi.mutate<DeleteMessageMutation, DeleteMessageMutationVariables>({
        mutation: DELETE_MESSAGE,
        variables: {
          id: messageId,
        }
      })
    } catch (e) {
      debugger
    }

    this.dispatchMessagesStore(messagesSlice.actions.removeOne(messageId))
  }
}
