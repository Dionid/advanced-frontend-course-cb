import {ApolloQueryResult, OperationVariables} from "@apollo/client/core/types";
import {MutationOptions, QueryOptions, SubscriptionOptions} from "@apollo/client/core/watchQueryOptions";
import {FetchResult} from "@apollo/client/link/core";
import {Observable} from "@apollo/client/utilities";

export interface GQLApi {
  query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables, T>): Promise<ApolloQueryResult<T>>
  mutate<T = any, TVariables = OperationVariables>(options: MutationOptions<T, TVariables>): Promise<FetchResult<T>>
  subscribe<T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables, T>): Observable<FetchResult<T>>
}
