import {gql} from "@apollo/client";
import {CreateRoomMutation, CreateRoomMutationVariables} from "libs/api/graphql";
import {GQLApi} from "libs/api/gqlApi";


const CREATE_ROOM = gql`
mutation CreateRoom($description: String!, $id: uuid!, $name: String!, $author_id: uuid!) {
  insert_room(objects: {id: $id, description: $description, name: $name, author_id: $author_id}) {
    affected_rows
  }
}
`

export interface RoomCreateApiCreateCmd {
  id: string
  description: string,
  name: string,
  author_id: string,
}

export class RoomCreateApi {
  constructor(
    private gqlApi: GQLApi,
  ) {
  }

  public create = async (cmd: RoomCreateApiCreateCmd) => {
    const result = await this.gqlApi.mutate<CreateRoomMutation, CreateRoomMutationVariables>({
      mutation: CREATE_ROOM,
      variables: {
        description: cmd.description,
        name: cmd.name,
        author_id: cmd.author_id,
        id: cmd.id,
      }
    })
  }
}
