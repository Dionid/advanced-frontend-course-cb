import {ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, split} from "@apollo/client";
import {ApolloQueryResult, OperationVariables} from "@apollo/client/core/types";
import {MutationOptions, QueryOptions, SubscriptionOptions} from "@apollo/client/core/watchQueryOptions";
import {getMainDefinition, Observable} from "@apollo/client/utilities";
import {FetchResult} from "@apollo/client/link/core";
import {WebSocketLink} from "@apollo/client/link/ws";
import {SubscriptionClient} from 'subscriptions-transport-ws';

export class GqlApi {
  private client: ApolloClient<NormalizedCacheObject>
  private wsLink: WebSocketLink
  private sc: SubscriptionClient
  private uri = 'advanced-course.herokuapp.com/v1/graphql'

  constructor(
    private getToken: () => string,
  ) {
    const httpLink = new HttpLink({ uri: "https://" + this.uri})

    const middlewareLink = new ApolloLink((operation, forward) => {
      const token = getToken()
      // return the headers to the context so httpLink can read them
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
      return forward(operation)
    })

    // authenticated httplink
    const httpLinkAuth = middlewareLink.concat(httpLink);

    this.sc = new SubscriptionClient(
      `wss://` + this.uri,
      {
        reconnect: true,
        lazy: true, // TODO. Think about this lazy loading
        connectionParams: () => {
          const token = getToken()
          if (token) {
            return {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          }
        }
      }
    )

    this.wsLink = new WebSocketLink(this.sc)

    // this.wsLink = new WebSocketLink({
    //   uri: `wss://` + this.uri,
    //   options: {
    //     reconnect: true,
    //     lazy: true, // TODO. Think about this lazy loading
    //     connectionParams: () => {
    //       const token = getToken()
    //       if (token) {
    //         return {
    //           headers: {
    //             Authorization: `Bearer ${getToken()}`
    //           }
    //         }
    //       }
    //     }
    //   },
    // });

    const link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return def.kind === 'OperationDefinition' && def.operation === 'subscription';
      },
      this.wsLink,
      httpLinkAuth,
    )
    this.client = new ApolloClient({
      link: ApolloLink.from([link]),
      connectToDevTools: true,
      cache: new InMemoryCache()
    });
  }

  refreshWS = () => {
    this.sc.close(false, false)
  }

  query = async <T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables, T>): Promise<ApolloQueryResult<T>> => {
    return this.client.query<T, TVariables>({
      fetchPolicy: "no-cache",
      ...options,
    })
  }

  mutate = async <T = any, TVariables = OperationVariables>(options: MutationOptions<T, TVariables>): Promise<FetchResult<T>> => {
    return this.client.mutate<T, TVariables>(options)
  }

  subscribe = <T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables, T>): Observable<FetchResult<T>> => {
    return this.client.subscribe<T, TVariables>(options)
  }
}
