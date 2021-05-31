import {AuthRepoRegisterCmd, AuthRepoUpdateMyPasswordCmd, AuthServiceLoginCmd} from "../../core/usecases";
import {AuthModel, authSlice} from "../redux/me";
import {ApolloQueryResult, gql} from "@apollo/client";
import {v4} from "uuid";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  UpdateMyPasswordMutation,
  UpdateMyPasswordMutationVariables,
  UserGetOneQuery,
  UserGetOneQueryVariables
} from "libs/api/graphql";
import jwt from "jsonwebtoken"
import {IncorrectOldPasswordError, IncorrectPasswordOrEmail} from "../../core/errors";
import {FetchResult} from "@apollo/client/link/core";
import {EmailMustBeUniqueError, UsernameMustBeUniqueError} from "../../../me/core/errors";
import { Dispatch } from "@reduxjs/toolkit";
import {GQLApi} from "../../../../../libs/api/gqlApi";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $id: uuid!, $password: String!, $username: String!) {
    insert_user_one(object: {email: $email, id: $id, password: $password, username: $username}) {
      id
    }
  }
`

const USER_GET_ONE = gql`
query UserGetOne($email: String!, $password: String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    id
    created_at
    username
    updated_at
    email
  }
}`

const UPDATE_MY_PASSWORD = gql`
mutation UpdateMyPassword($id: uuid!, $password: String!, $newpassword: String) {
  update_user(where: {id: {_eq: $id}, password: {_eq: $password}}, _set: {password: $newpassword}) {
    affected_rows
  }
}
`

export class AuthRepo {
  constructor(
    private getState: () => AuthModel,
    private dispatch: Dispatch,
    private gqlApi: GQLApi,
  ) {
  }

  register = async (cmd: AuthRepoRegisterCmd): Promise<void> => {
    debugger
    try {
      const result = await this.gqlApi.mutate<CreateUserMutation, CreateUserMutationVariables>({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email: cmd.email,
          id: v4(),
          password: cmd.password,
          username: cmd.username,
        }
      })
      console.log(result)
    } catch (e) {
      if (e.message.includes("Uniqueness violation")) {
        if (e.message.includes("user_email_key")) {
          throw new EmailMustBeUniqueError()
        } else if (e.message.includes("user_username_key")) {
          throw new UsernameMustBeUniqueError()
        }
      }
      debugger
      throw e
    }

    return
  }

  login = async (cmd: AuthServiceLoginCmd): Promise<void> => {
    // . Get user
    let userData: ApolloQueryResult<UserGetOneQuery>
    try {
      userData = await this.gqlApi.query<UserGetOneQuery, UserGetOneQueryVariables>({
        query: USER_GET_ONE,
        variables: {
          email: cmd.email,
          password: cmd.password,
        }
      })
    } catch (e) {
      debugger
      throw e
    }

    if (userData.data.user.length === 0) {
      throw new IncorrectPasswordOrEmail()
    }

    const user = userData.data.user[0]

    // . Create token
    const token = await jwt.sign({
        "sub": user.id,
        "name": user.username,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": user.id,
        }
      },
      process.env.REACT_APP_HASH_KEY as string,
    );

    debugger

    // . Store it in store
    this.dispatch(authSlice.actions.set({ token }))

    return
  }

  clearToken = async (): Promise<void> => {
    this.dispatch(authSlice.actions.clear())
  }

  isAuthenticated = (): boolean => {
    return !!this.getState().token
  }

  updateMyPassword = async (cmd: AuthRepoUpdateMyPasswordCmd) => {
    debugger
    let result: FetchResult<UpdateMyPasswordMutation>
    try {
      result = await this.gqlApi.mutate<UpdateMyPasswordMutation, UpdateMyPasswordMutationVariables>({
        mutation: UPDATE_MY_PASSWORD,
        variables: {
          id: cmd.myId,
          password: cmd.oldPassword,
          newpassword: cmd.newPassword,
        }
      })
    } catch (e) {
      debugger
      return
    }
    if (!result.data || !result.data.update_user) {
      debugger
      return
    }
    debugger
    if (result.data.update_user.affected_rows === 0) {
      throw new IncorrectOldPasswordError()
    }
  }
}
