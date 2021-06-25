import {Me, MeId} from "../../core/entities";
import {MeModel, meSlice} from "../redux/me";
import {Dispatch} from "@reduxjs/toolkit";
import {ApolloQueryResult, gql} from "@apollo/client";
import {
  GetMeQuery,
  GetMeQueryVariables,
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
} from "libs/api/graphql";
import jwt from "jsonwebtoken"
import {MeUCUpdateMyInfoCmd} from "../../core/usecases/me";
import {EmailMustBeUniqueError, UsernameMustBeUniqueError} from "../../core/errors";
import {GQLApi} from "../../../../../libs/api/gqlApi";
import {Email} from "../../../../../libs/dddfn/casualTypes";

const GET_ME = gql`
query GetMe($id: uuid!) {
  user(where: {id: {_eq: $id}}) {
    id
    created_at
    username
    updated_at
    email
  }
}`

const UPDATE_MY_INFO = gql`
mutation UpdateUserInfo($id: uuid!, $email: String!, $username: String!) {
  update_user_by_pk(pk_columns: {id: $id}, _set: {email: $email, username: $username}) {
    id
  }
}
`

export class NotAuthed extends Error {
  constructor() {
    super("User is not authenticated");
  }
}

export class MeRepository {
  constructor(
    private getState: () => MeModel,
    private dispatch: Dispatch,
    private getAuthToken: () => string,
    private isAuthenticated: () => boolean,
    private gqlApi: GQLApi,
  ) {
  }

  fetchMe = async (): Promise<void> => {
    const isAuthed = this.isAuthenticated()
    if (!isAuthed) {
      throw new NotAuthed()
    }

    const token = this.getAuthToken()
    if (!token) {
      // TODO. Make as critical error
      throw new Error("no token found")
    }

    const decoded: {sub: string} = jwt.verify(token, process.env.REACT_APP_HASH_KEY as string) as {sub: string}

    // . If no, than request it
    let userData: ApolloQueryResult<GetMeQuery>
    try {
      userData = await this.gqlApi.query<GetMeQuery, GetMeQueryVariables>({
        query: GET_ME,
        variables: {
          id: decoded.sub,
        }
      })
    } catch (e) {
      debugger
      throw e
    }

    if (userData.data.user.length === 0) {
      throw new Error("no user found")
    }

    const user = userData.data.user[0]

    const me: Me = Me({
      id: MeId(user.id),
      username: user.username,
      email: Email(user.email),
      roles: [],
      registrationDate: new Date(user.created_at),
    })

    // . Save me
    this.dispatch(meSlice.actions.set({
      ...me,
      registrationDate: me.registrationDate!.toISOString(),
    }))
  }

  getMe = async (): Promise<Me> => {
    // . TODO. This must be also DI
    const state = this.getState()
    return Me({
      ...state,
      registrationDate: new Date(state.registrationDate),
    })
  }

  getOrFetchMe = async (): Promise<Me> => {
    // . Check if there is me
    let me = await this.getMe()

    if (!me.id) {
      await this.fetchMe()
    }

    // . Return me
    return this.getMe()
  }

  clearMe = async (): Promise<void> => {
    this.dispatch(meSlice.actions.clear())
  }

  updateMyInfo = async (cmd: MeUCUpdateMyInfoCmd): Promise<void> => {
    const me = await this.getMe()
    try {
      await this.gqlApi.mutate<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>({
        mutation: UPDATE_MY_INFO,
        variables: {
          id: me.id,
          email: cmd.email,
          username: cmd.username,
        }
      })
    } catch (e) {
      if (e.message.includes("duplicate key value violates unique constraint")) {
        if (e.message.includes("user_email_key")) {
          throw new EmailMustBeUniqueError()
        } else if (e.message.includes("user_username_key")) {
          throw new UsernameMustBeUniqueError()
        }
      }
    }
  }
}
