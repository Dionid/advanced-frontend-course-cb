import {ApolloQueryResult, gql} from "@apollo/client";
import {Room, RoomService} from "../../core/entities/rooms";
import {
  GetRoomsListBySearchParamsQuery,
  GetRoomsListBySearchParamsQueryVariables,
  Maybe,
  NewRoomSubscriptionSubscription,
  Room_Bool_Exp,
} from "libs/api/graphql";
import {Observable} from "@apollo/client/utilities";
import {FetchResult} from "@apollo/client/link/core";
import {GQLApi} from "libs/api/gqlApi";


const GET_ROOMS_BY_SEARCH_PARAMS = gql`
query GetRoomsListBySearchParams($limit: Int!, $offset: Int!, $_and: [room_bool_exp] = []) {
  room_aggregate(where: {_and: $_and, deleted_at: {_is_null: true}}) {
    aggregate {
      count
    }
  }
  room(limit: $limit, offset: $offset, order_by: {created_at: desc}, where: {_and: $_and, deleted_at: {_is_null: true}}) {
    updated_at
    name
    id
    description
    created_at
    author_id
    deleted_at
    members {
      id
      updated_at
      user_id
    }
  }
}
`

const NEW_ROOM_SUBSCRIPTION = gql`
subscription NewRoomSubscription($_and: [room_bool_exp] = []) {
  room(order_by: {created_at: desc}, limit: 1, where: {_and: $_and}) {
    id
  }
}
`

export class RoomsApi {
  constructor(
    private getMyId: () => string,
    private gqlApi: GQLApi,
  ) {
  }

  private createAndOperator = (
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ) => {
    const andOperator: Array<Maybe<Room_Bool_Exp>> = []
    if (search) {
      andOperator.push({
        _or: [
          {
            name: {
              _ilike: `%${search}%`
            }
          },
          {
            description: {
              _ilike: `%${search}%`
            }
          }
        ]
      })
    }
    const myId = this.getMyId()
    if (myRooms && withMe) {
      andOperator.push({
        _or: [
          {
            author_id: {
              _eq: myId,
            }
          },
          {
            "members": {
              "user_id": {"_eq": myId}
            }
          }
        ]
      })
    } else if (myRooms) {
      andOperator.push({
        author_id: {
          _eq: myId,
        }
      })
    } else if (withMe) {
      andOperator.push({
        "members": {
          "user_id": {"_eq": myId}
        }
      })
    }
    if (notEmpty) {
      const now = new Date()
      now.setMinutes(now.getMinutes() - 5)
      console.log(now)
      andOperator.push({
        "members": {
          "updated_at": {
            "_gte": now.toISOString()
          }
        }
      })
    }
    return andOperator
  }

  fetchRoomsBySearchParams = async (
    page: number,
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ): Promise<[Room[], number]> => {

    let roomsData: ApolloQueryResult<GetRoomsListBySearchParamsQuery>
    try {
      const andOperator = this.createAndOperator(
        search,
        myRooms,
        withMe,
        notEmpty,
      )
      roomsData = await this.gqlApi.query<GetRoomsListBySearchParamsQuery, GetRoomsListBySearchParamsQueryVariables>({
        query: GET_ROOMS_BY_SEARCH_PARAMS,
        variables: {
          offset: (page-1) * 9,
          limit: 9,
          _and: andOperator,
        }
      })
    } catch (e) {
      debugger
      return [[], 0]
    }

    const rooms = roomsData.data.room.map( r => {
      return RoomService.newRoom({
        id: r.id,
        name: r.name,
        description: r.description || "",
        createdAt: new Date(r.created_at),
        deletedAt: r.deleted_at ? new Date(r.deleted_at) : null,
        updatedAt: new Date(r.updated_at),
        author: r.author_id,
        members: r.members.map( m => ({ updatedAt: new Date(m.updated_at), userId: m.user_id})),
      })
    })

    return [rooms, roomsData.data.room_aggregate.aggregate?.count || 1]
  }

  public subscribeOnNewRoomUpdate = (
    search: string,
    myRooms: boolean,
    withMe: boolean,
    notEmpty: boolean
  ): Observable<FetchResult<NewRoomSubscriptionSubscription>> => {
    try {
      const andOperator = this.createAndOperator(
        search,
        myRooms,
        withMe,
        notEmpty,
      )
      const sub = this.gqlApi.subscribe<NewRoomSubscriptionSubscription>({
        query: NEW_ROOM_SUBSCRIPTION,
        variables: {
          _and: andOperator,
        }
      })
      return sub
    } catch (e) {
      debugger
      throw e
    }
  }
}
