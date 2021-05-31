import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "message" */
export type Message = {
  __typename?: 'message';
  /** An object relationship */
  author: User;
  author_id: Scalars['uuid'];
  body: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  room_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "message" */
export type Message_Aggregate = {
  __typename?: 'message_aggregate';
  aggregate?: Maybe<Message_Aggregate_Fields>;
  nodes: Array<Message>;
};

/** aggregate fields of "message" */
export type Message_Aggregate_Fields = {
  __typename?: 'message_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Message_Max_Fields>;
  min?: Maybe<Message_Min_Fields>;
};


/** aggregate fields of "message" */
export type Message_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Message_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "message" */
export type Message_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Message_Max_Order_By>;
  min?: Maybe<Message_Min_Order_By>;
};

/** input type for inserting array relation for remote table "message" */
export type Message_Arr_Rel_Insert_Input = {
  data: Array<Message_Insert_Input>;
  on_conflict?: Maybe<Message_On_Conflict>;
};

/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export type Message_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Message_Bool_Exp>>>;
  _not?: Maybe<Message_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Message_Bool_Exp>>>;
  author?: Maybe<User_Bool_Exp>;
  author_id?: Maybe<Uuid_Comparison_Exp>;
  body?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  room_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "message" */
export enum Message_Constraint {
  /** unique or primary key constraint */
  MessagePkey = 'message_pkey'
}

/** input type for inserting data into table "message" */
export type Message_Insert_Input = {
  author?: Maybe<User_Obj_Rel_Insert_Input>;
  author_id?: Maybe<Scalars['uuid']>;
  body?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Message_Max_Fields = {
  __typename?: 'message_max_fields';
  author_id?: Maybe<Scalars['uuid']>;
  body?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "message" */
export type Message_Max_Order_By = {
  author_id?: Maybe<Order_By>;
  body?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  room_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Message_Min_Fields = {
  __typename?: 'message_min_fields';
  author_id?: Maybe<Scalars['uuid']>;
  body?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "message" */
export type Message_Min_Order_By = {
  author_id?: Maybe<Order_By>;
  body?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  room_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "message" */
export type Message_Mutation_Response = {
  __typename?: 'message_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Message>;
};

/** input type for inserting object relation for remote table "message" */
export type Message_Obj_Rel_Insert_Input = {
  data: Message_Insert_Input;
  on_conflict?: Maybe<Message_On_Conflict>;
};

/** on conflict condition type for table "message" */
export type Message_On_Conflict = {
  constraint: Message_Constraint;
  update_columns: Array<Message_Update_Column>;
  where?: Maybe<Message_Bool_Exp>;
};

/** ordering options when selecting data from "message" */
export type Message_Order_By = {
  author?: Maybe<User_Order_By>;
  author_id?: Maybe<Order_By>;
  body?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  room_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "message" */
export type Message_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "message" */
export enum Message_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "message" */
export type Message_Set_Input = {
  author_id?: Maybe<Scalars['uuid']>;
  body?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "message" */
export enum Message_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "message" */
  delete_message?: Maybe<Message_Mutation_Response>;
  /** delete single row from the table: "message" */
  delete_message_by_pk?: Maybe<Message>;
  /** delete data from the table: "room" */
  delete_room?: Maybe<Room_Mutation_Response>;
  /** delete single row from the table: "room" */
  delete_room_by_pk?: Maybe<Room>;
  /** delete data from the table: "room_member" */
  delete_room_member?: Maybe<Room_Member_Mutation_Response>;
  /** delete single row from the table: "room_member" */
  delete_room_member_by_pk?: Maybe<Room_Member>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "message" */
  insert_message?: Maybe<Message_Mutation_Response>;
  /** insert a single row into the table: "message" */
  insert_message_one?: Maybe<Message>;
  /** insert data into the table: "room" */
  insert_room?: Maybe<Room_Mutation_Response>;
  /** insert data into the table: "room_member" */
  insert_room_member?: Maybe<Room_Member_Mutation_Response>;
  /** insert a single row into the table: "room_member" */
  insert_room_member_one?: Maybe<Room_Member>;
  /** insert a single row into the table: "room" */
  insert_room_one?: Maybe<Room>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** update data of the table: "message" */
  update_message?: Maybe<Message_Mutation_Response>;
  /** update single row of the table: "message" */
  update_message_by_pk?: Maybe<Message>;
  /** update data of the table: "room" */
  update_room?: Maybe<Room_Mutation_Response>;
  /** update single row of the table: "room" */
  update_room_by_pk?: Maybe<Room>;
  /** update data of the table: "room_member" */
  update_room_member?: Maybe<Room_Member_Mutation_Response>;
  /** update single row of the table: "room_member" */
  update_room_member_by_pk?: Maybe<Room_Member>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_MessageArgs = {
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Message_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_RoomArgs = {
  where: Room_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Room_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Room_MemberArgs = {
  where: Room_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Room_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_MessageArgs = {
  objects: Array<Message_Insert_Input>;
  on_conflict?: Maybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Message_OneArgs = {
  object: Message_Insert_Input;
  on_conflict?: Maybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoomArgs = {
  objects: Array<Room_Insert_Input>;
  on_conflict?: Maybe<Room_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Room_MemberArgs = {
  objects: Array<Room_Member_Insert_Input>;
  on_conflict?: Maybe<Room_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Room_Member_OneArgs = {
  object: Room_Member_Insert_Input;
  on_conflict?: Maybe<Room_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Room_OneArgs = {
  object: Room_Insert_Input;
  on_conflict?: Maybe<Room_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_MessageArgs = {
  _set?: Maybe<Message_Set_Input>;
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Message_By_PkArgs = {
  _set?: Maybe<Message_Set_Input>;
  pk_columns: Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RoomArgs = {
  _set?: Maybe<Room_Set_Input>;
  where: Room_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Room_By_PkArgs = {
  _set?: Maybe<Room_Set_Input>;
  pk_columns: Room_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Room_MemberArgs = {
  _set?: Maybe<Room_Member_Set_Input>;
  where: Room_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Room_Member_By_PkArgs = {
  _set?: Maybe<Room_Member_Set_Input>;
  pk_columns: Room_Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "room" */
  room: Array<Room>;
  /** fetch aggregated fields from the table: "room" */
  room_aggregate: Room_Aggregate;
  /** fetch data from the table: "room" using primary key columns */
  room_by_pk?: Maybe<Room>;
  /** fetch data from the table: "room_member" */
  room_member: Array<Room_Member>;
  /** fetch data from the table: "room_member" using primary key columns */
  room_member_by_pk?: Maybe<Room_Member>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** query root */
export type Query_RootMessageArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** query root */
export type Query_RootMessage_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** query root */
export type Query_RootMessage_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Order_By>>;
  where?: Maybe<Room_Bool_Exp>;
};


/** query root */
export type Query_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Order_By>>;
  where?: Maybe<Room_Bool_Exp>;
};


/** query root */
export type Query_RootRoom_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootRoom_MemberArgs = {
  distinct_on?: Maybe<Array<Room_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Member_Order_By>>;
  where?: Maybe<Room_Member_Bool_Exp>;
};


/** query root */
export type Query_RootRoom_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "room" */
export type Room = {
  __typename?: 'room';
  /** An object relationship */
  author: User;
  author_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  members: Array<Room_Member>;
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "room" */
export type RoomMembersArgs = {
  distinct_on?: Maybe<Array<Room_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Member_Order_By>>;
  where?: Maybe<Room_Member_Bool_Exp>;
};

/** aggregated selection of "room" */
export type Room_Aggregate = {
  __typename?: 'room_aggregate';
  aggregate?: Maybe<Room_Aggregate_Fields>;
  nodes: Array<Room>;
};

/** aggregate fields of "room" */
export type Room_Aggregate_Fields = {
  __typename?: 'room_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Room_Max_Fields>;
  min?: Maybe<Room_Min_Fields>;
};


/** aggregate fields of "room" */
export type Room_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Room_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "room" */
export type Room_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Room_Max_Order_By>;
  min?: Maybe<Room_Min_Order_By>;
};

/** input type for inserting array relation for remote table "room" */
export type Room_Arr_Rel_Insert_Input = {
  data: Array<Room_Insert_Input>;
  on_conflict?: Maybe<Room_On_Conflict>;
};

/** Boolean expression to filter rows from the table "room". All fields are combined with a logical 'AND'. */
export type Room_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Room_Bool_Exp>>>;
  _not?: Maybe<Room_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Room_Bool_Exp>>>;
  author?: Maybe<User_Bool_Exp>;
  author_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  deleted_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  members?: Maybe<Room_Member_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "room" */
export enum Room_Constraint {
  /** unique or primary key constraint */
  RoomPkey = 'room_pkey'
}

/** input type for inserting data into table "room" */
export type Room_Insert_Input = {
  author?: Maybe<User_Obj_Rel_Insert_Input>;
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  members?: Maybe<Room_Member_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Room_Max_Fields = {
  __typename?: 'room_max_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "room" */
export type Room_Max_Order_By = {
  author_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** columns and relationships of "room_member" */
export type Room_Member = {
  __typename?: 'room_member';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  room_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid'];
};

/** input type for inserting array relation for remote table "room_member" */
export type Room_Member_Arr_Rel_Insert_Input = {
  data: Array<Room_Member_Insert_Input>;
  on_conflict?: Maybe<Room_Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "room_member". All fields are combined with a logical 'AND'. */
export type Room_Member_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Room_Member_Bool_Exp>>>;
  _not?: Maybe<Room_Member_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Room_Member_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  room_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "room_member" */
export enum Room_Member_Constraint {
  /** unique or primary key constraint */
  RoomMemberPkey = 'room_member_pkey',
  /** unique or primary key constraint */
  RoomMemberRoomIdUserIdKey = 'room_member_room_id_user_id_key'
}

/** input type for inserting data into table "room_member" */
export type Room_Member_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "room_member" */
export type Room_Member_Mutation_Response = {
  __typename?: 'room_member_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Room_Member>;
};

/** input type for inserting object relation for remote table "room_member" */
export type Room_Member_Obj_Rel_Insert_Input = {
  data: Room_Member_Insert_Input;
  on_conflict?: Maybe<Room_Member_On_Conflict>;
};

/** on conflict condition type for table "room_member" */
export type Room_Member_On_Conflict = {
  constraint: Room_Member_Constraint;
  update_columns: Array<Room_Member_Update_Column>;
  where?: Maybe<Room_Member_Bool_Exp>;
};

/** ordering options when selecting data from "room_member" */
export type Room_Member_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  room_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "room_member" */
export type Room_Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "room_member" */
export enum Room_Member_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "room_member" */
export type Room_Member_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  room_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "room_member" */
export enum Room_Member_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate min on columns */
export type Room_Min_Fields = {
  __typename?: 'room_min_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "room" */
export type Room_Min_Order_By = {
  author_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "room" */
export type Room_Mutation_Response = {
  __typename?: 'room_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Room>;
};

/** input type for inserting object relation for remote table "room" */
export type Room_Obj_Rel_Insert_Input = {
  data: Room_Insert_Input;
  on_conflict?: Maybe<Room_On_Conflict>;
};

/** on conflict condition type for table "room" */
export type Room_On_Conflict = {
  constraint: Room_Constraint;
  update_columns: Array<Room_Update_Column>;
  where?: Maybe<Room_Bool_Exp>;
};

/** ordering options when selecting data from "room" */
export type Room_Order_By = {
  author?: Maybe<User_Order_By>;
  author_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "room" */
export type Room_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "room" */
export enum Room_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "room" */
export type Room_Set_Input = {
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "room" */
export enum Room_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "room" */
  room: Array<Room>;
  /** fetch aggregated fields from the table: "room" */
  room_aggregate: Room_Aggregate;
  /** fetch data from the table: "room" using primary key columns */
  room_by_pk?: Maybe<Room>;
  /** fetch data from the table: "room_member" */
  room_member: Array<Room_Member>;
  /** fetch data from the table: "room_member" using primary key columns */
  room_member_by_pk?: Maybe<Room_Member>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** subscription root */
export type Subscription_RootMessageArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessage_AggregateArgs = {
  distinct_on?: Maybe<Array<Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Message_Order_By>>;
  where?: Maybe<Message_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMessage_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Order_By>>;
  where?: Maybe<Room_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Order_By>>;
  where?: Maybe<Room_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoom_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRoom_MemberArgs = {
  distinct_on?: Maybe<Array<Room_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Room_Member_Order_By>>;
  where?: Maybe<Room_Member_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRoom_Member_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  password: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  username: Scalars['String'];
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  password?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = 'user_email_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey',
  /** unique or primary key constraint */
  UserUsernameKey = 'user_username_key'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  id: Scalars['uuid'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_user_one?: Maybe<(
    { __typename?: 'user' }
    & Pick<User, 'id'>
  )> }
);

export type UserGetOneQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserGetOneQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'created_at' | 'username' | 'updated_at' | 'email'>
  )> }
);

export type UpdateMyPasswordMutationVariables = Exact<{
  id: Scalars['uuid'];
  password: Scalars['String'];
  newpassword?: Maybe<Scalars['String']>;
}>;


export type UpdateMyPasswordMutation = (
  { __typename?: 'mutation_root' }
  & { update_user?: Maybe<(
    { __typename?: 'user_mutation_response' }
    & Pick<User_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetMeQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetMeQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'created_at' | 'username' | 'updated_at' | 'email'>
  )> }
);

export type UpdateUserInfoMutationVariables = Exact<{
  id: Scalars['uuid'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type UpdateUserInfoMutation = (
  { __typename?: 'mutation_root' }
  & { update_user_by_pk?: Maybe<(
    { __typename?: 'user' }
    & Pick<User, 'id'>
  )> }
);

export type SubscribeRoomPageDataSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeRoomPageDataSubscription = (
  { __typename?: 'subscription_root' }
  & { room_by_pk?: Maybe<(
    { __typename?: 'room' }
    & Pick<Room, 'author_id' | 'created_at' | 'deleted_at' | 'description' | 'id' | 'name' | 'updated_at'>
    & { members: Array<(
      { __typename?: 'room_member' }
      & Pick<Room_Member, 'id' | 'updated_at'>
      & { user: (
        { __typename?: 'user' }
        & Pick<User, 'username' | 'id'>
      ) }
    )>, author: (
      { __typename?: 'user' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type EnterRoomMutationVariables = Exact<{
  user_id: Scalars['uuid'];
  room_id: Scalars['uuid'];
  id: Scalars['uuid'];
}>;


export type EnterRoomMutation = (
  { __typename?: 'mutation_root' }
  & { insert_room_member_one?: Maybe<(
    { __typename?: 'room_member' }
    & Pick<Room_Member, 'id'>
  )> }
);

export type DeleteRoomMutationVariables = Exact<{
  room_id: Scalars['uuid'];
  deleted_at: Scalars['timestamptz'];
}>;


export type DeleteRoomMutation = (
  { __typename?: 'mutation_root' }
  & { update_room_by_pk?: Maybe<(
    { __typename?: 'room' }
    & Pick<Room, 'id'>
  )> }
);

export type EditRoomMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type EditRoomMutation = (
  { __typename?: 'mutation_root' }
  & { update_room_by_pk?: Maybe<(
    { __typename?: 'room' }
    & Pick<Room, 'id'>
  )> }
);

export type MessageSubscriptionSubscriptionVariables = Exact<{
  room_id: Scalars['uuid'];
}>;


export type MessageSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { message: Array<(
    { __typename?: 'message' }
    & Pick<Message, 'body' | 'created_at' | 'id' | 'room_id' | 'updated_at'>
    & { author: (
      { __typename?: 'user' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type NewMessageMutationVariables = Exact<{
  author_id: Scalars['uuid'];
  body: Scalars['String'];
  id: Scalars['uuid'];
  room_id: Scalars['uuid'];
}>;


export type NewMessageMutation = (
  { __typename?: 'mutation_root' }
  & { insert_message_one?: Maybe<(
    { __typename?: 'message' }
    & Pick<Message, 'id'>
  )> }
);

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'mutation_root' }
  & { delete_message_by_pk?: Maybe<(
    { __typename?: 'message' }
    & Pick<Message, 'id'>
  )> }
);

export type EditMessageMutationVariables = Exact<{
  id: Scalars['uuid'];
  body: Scalars['String'];
}>;


export type EditMessageMutation = (
  { __typename?: 'mutation_root' }
  & { update_message_by_pk?: Maybe<(
    { __typename?: 'message' }
    & Pick<Message, 'id'>
  )> }
);

export type CreateRoomMutationVariables = Exact<{
  description: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  author_id: Scalars['uuid'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'mutation_root' }
  & { insert_room?: Maybe<(
    { __typename?: 'room_mutation_response' }
    & Pick<Room_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetRoomsListBySearchParamsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  _and?: Maybe<Array<Maybe<Room_Bool_Exp>> | Maybe<Room_Bool_Exp>>;
}>;


export type GetRoomsListBySearchParamsQuery = (
  { __typename?: 'query_root' }
  & { room_aggregate: (
    { __typename?: 'room_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'room_aggregate_fields' }
      & Pick<Room_Aggregate_Fields, 'count'>
    )> }
  ), room: Array<(
    { __typename?: 'room' }
    & Pick<Room, 'updated_at' | 'name' | 'id' | 'description' | 'created_at' | 'author_id' | 'deleted_at'>
    & { members: Array<(
      { __typename?: 'room_member' }
      & Pick<Room_Member, 'id' | 'updated_at' | 'user_id'>
    )> }
  )> }
);

export type NewRoomSubscriptionSubscriptionVariables = Exact<{
  _and?: Maybe<Array<Maybe<Room_Bool_Exp>> | Maybe<Room_Bool_Exp>>;
}>;


export type NewRoomSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { room: Array<(
    { __typename?: 'room' }
    & Pick<Room, 'id'>
  )> }
);

export type RoomUpdateSubscriptionSubscriptionVariables = Exact<{
  room_id: Scalars['uuid'];
}>;


export type RoomUpdateSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { room_by_pk?: Maybe<(
    { __typename?: 'room' }
    & Pick<Room, 'updated_at' | 'name' | 'id' | 'description' | 'deleted_at' | 'created_at' | 'author_id'>
    & { members: Array<(
      { __typename?: 'room_member' }
      & Pick<Room_Member, 'id' | 'updated_at' | 'user_id'>
    )> }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $id: uuid!, $password: String!, $username: String!) {
  insert_user_one(
    object: {email: $email, id: $id, password: $password, username: $username}
  ) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UserGetOneDocument = gql`
    query UserGetOne($email: String!, $password: String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    id
    created_at
    username
    updated_at
    email
  }
}
    `;
export type UserGetOneQueryResult = Apollo.QueryResult<UserGetOneQuery, UserGetOneQueryVariables>;
export const UpdateMyPasswordDocument = gql`
    mutation UpdateMyPassword($id: uuid!, $password: String!, $newpassword: String) {
  update_user(
    where: {id: {_eq: $id}, password: {_eq: $password}}
    _set: {password: $newpassword}
  ) {
    affected_rows
  }
}
    `;
export type UpdateMyPasswordMutationFn = Apollo.MutationFunction<UpdateMyPasswordMutation, UpdateMyPasswordMutationVariables>;
export type UpdateMyPasswordMutationResult = Apollo.MutationResult<UpdateMyPasswordMutation>;
export type UpdateMyPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateMyPasswordMutation, UpdateMyPasswordMutationVariables>;
export const GetMeDocument = gql`
    query GetMe($id: uuid!) {
  user(where: {id: {_eq: $id}}) {
    id
    created_at
    username
    updated_at
    email
  }
}
    `;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($id: uuid!, $email: String!, $username: String!) {
  update_user_by_pk(
    pk_columns: {id: $id}
    _set: {email: $email, username: $username}
  ) {
    id
  }
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const SubscribeRoomPageDataDocument = gql`
    subscription SubscribeRoomPageData($id: uuid!) {
  room_by_pk(id: $id) {
    author_id
    created_at
    deleted_at
    description
    id
    name
    updated_at
    members {
      id
      updated_at
      user {
        username
        id
      }
    }
    author {
      id
      username
    }
  }
}
    `;
export type SubscribeRoomPageDataSubscriptionResult = Apollo.SubscriptionResult<SubscribeRoomPageDataSubscription>;
export const EnterRoomDocument = gql`
    mutation EnterRoom($user_id: uuid!, $room_id: uuid!, $id: uuid!) {
  insert_room_member_one(
    object: {room_id: $room_id, id: $id, user_id: $user_id}
    on_conflict: {constraint: room_member_room_id_user_id_key, update_columns: updated_at}
  ) {
    id
  }
}
    `;
export type EnterRoomMutationFn = Apollo.MutationFunction<EnterRoomMutation, EnterRoomMutationVariables>;
export type EnterRoomMutationResult = Apollo.MutationResult<EnterRoomMutation>;
export type EnterRoomMutationOptions = Apollo.BaseMutationOptions<EnterRoomMutation, EnterRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($room_id: uuid!, $deleted_at: timestamptz!) {
  update_room_by_pk(pk_columns: {id: $room_id}, _set: {deleted_at: $deleted_at}) {
    id
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const EditRoomDocument = gql`
    mutation EditRoom($id: uuid!, $name: String!, $description: String!) {
  update_room_by_pk(
    pk_columns: {id: $id}
    _set: {name: $name, description: $description}
  ) {
    id
  }
}
    `;
export type EditRoomMutationFn = Apollo.MutationFunction<EditRoomMutation, EditRoomMutationVariables>;
export type EditRoomMutationResult = Apollo.MutationResult<EditRoomMutation>;
export type EditRoomMutationOptions = Apollo.BaseMutationOptions<EditRoomMutation, EditRoomMutationVariables>;
export const MessageSubscriptionDocument = gql`
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
}
    `;
export type MessageSubscriptionSubscriptionResult = Apollo.SubscriptionResult<MessageSubscriptionSubscription>;
export const NewMessageDocument = gql`
    mutation NewMessage($author_id: uuid!, $body: String!, $id: uuid!, $room_id: uuid!) {
  insert_message_one(
    object: {author_id: $author_id, body: $body, id: $id, room_id: $room_id}
  ) {
    id
  }
}
    `;
export type NewMessageMutationFn = Apollo.MutationFunction<NewMessageMutation, NewMessageMutationVariables>;
export type NewMessageMutationResult = Apollo.MutationResult<NewMessageMutation>;
export type NewMessageMutationOptions = Apollo.BaseMutationOptions<NewMessageMutation, NewMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: uuid!) {
  delete_message_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($id: uuid!, $body: String!) {
  update_message_by_pk(pk_columns: {id: $id}, _set: {body: $body}) {
    id
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($description: String!, $id: uuid!, $name: String!, $author_id: uuid!) {
  insert_room(
    objects: {id: $id, description: $description, name: $name, author_id: $author_id}
  ) {
    affected_rows
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const GetRoomsListBySearchParamsDocument = gql`
    query GetRoomsListBySearchParams($limit: Int!, $offset: Int!, $_and: [room_bool_exp] = []) {
  room_aggregate(where: {_and: $_and, deleted_at: {_is_null: true}}) {
    aggregate {
      count
    }
  }
  room(
    limit: $limit
    offset: $offset
    order_by: {created_at: desc}
    where: {_and: $_and, deleted_at: {_is_null: true}}
  ) {
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
    `;
export type GetRoomsListBySearchParamsQueryResult = Apollo.QueryResult<GetRoomsListBySearchParamsQuery, GetRoomsListBySearchParamsQueryVariables>;
export const NewRoomSubscriptionDocument = gql`
    subscription NewRoomSubscription($_and: [room_bool_exp] = []) {
  room(order_by: {created_at: desc}, limit: 1, where: {_and: $_and}) {
    id
  }
}
    `;
export type NewRoomSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewRoomSubscriptionSubscription>;
export const RoomUpdateSubscriptionDocument = gql`
    subscription RoomUpdateSubscription($room_id: uuid!) {
  room_by_pk(id: $room_id) {
    updated_at
    name
    id
    description
    deleted_at
    created_at
    author_id
    members {
      id
      updated_at
      user_id
    }
  }
}
    `;
export type RoomUpdateSubscriptionSubscriptionResult = Apollo.SubscriptionResult<RoomUpdateSubscriptionSubscription>;