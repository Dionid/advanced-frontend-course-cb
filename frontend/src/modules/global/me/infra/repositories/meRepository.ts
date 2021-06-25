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

export type MeRepository = ReturnType<typeof MeRepository>
export const MeRepository = (
    getState: () => MeModel,
    dispatch: Dispatch,
    getAuthToken: () => string,
    isAuthenticated: () => boolean,
    gqlApi: GQLApi,
  ) => {
  const fetchMe = async (): Promise<void> => {
    const isAuthed = isAuthenticated()
    if (!isAuthed) {
      throw new NotAuthed()
    }

    const token = getAuthToken()
    if (!token) {
      // TODO. Make as critical error
      throw new Error("no token found")
    }

    const decoded: {sub: string} = jwt.verify(token, process.env.REACT_APP_HASH_KEY as string) as {sub: string}

    // . If no, than request it
    let userData: ApolloQueryResult<GetMeQuery>
    try {
      userData = await gqlApi.query<GetMeQuery, GetMeQueryVariables>({
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

    const me: MeModel = {
      id: MeId(user.id),
      username: user.username,
      email: Email(user.email),
      roles: [],
      registrationDate: new Date(user.created_at).toISOString(),
    }

    // . Save me
    dispatch(meSlice.actions.set(me))
  }
  const getMe = async (): Promise<Me> => {
    // . TODO. This must be also DI
    const state = getState()
    return Me({
      ...state,
      registrationDate: new Date(state.registrationDate),
    })
  }
  return {
    fetchMe,
    getMe,
    getOrFetchMe: async (): Promise<Me> => {
      // . Check if there is me
      let me = await getMe()

      if (!me.id) {
        await fetchMe()
      }

      // . Return me
      return getMe()
    },
    clearMe: async (): Promise<void> => {
      dispatch(meSlice.actions.clear())
    },
    updateMyInfo: async (cmd: MeUCUpdateMyInfoCmd): Promise<void> => {
      const me = await getMe()
      try {
        await gqlApi.mutate<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>({
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
}
