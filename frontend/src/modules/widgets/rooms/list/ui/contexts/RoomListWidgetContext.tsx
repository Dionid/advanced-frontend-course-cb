import {createContext, FunctionComponent, useContext, useEffect, useMemo, useState} from "react";
import {ActiveFilters, RoomsSearchIndex} from "../../core/entities/search";
import {UrlService} from "../../utils/UrlService";
import {RoomListUC} from "../../core/usecases/roomListUC";
import {MainRepository} from "../../infra/repositories/mainRepository";
import {useHistory, useLocation} from "react-router-dom"
import {Room, RoomID} from "../../core/entities/rooms";
import {RoomsRepository} from "../../infra/repositories/rooms";
import {RoomsSubscriptionUC} from "../../core/usecases/roomsSubUC";
import {RoomsSubscriptionRepository} from "../../infra/repositories/roomsSubscription";
import {RoomsApi} from "../../infra/api/gql";
import {useGlobalDependenciesContext} from "../../../../../global/ui/contexts/GlobalDependenciesCtx";

const defaultActiveFilterState: ActiveFilters = {
  text: {
    value: ""
  },
  myRooms: {
    value: false
  },
  roomsWithMe: {
    value: false
  },
  notEmpty: {
    value: false
  },
  page: {
    value: 1
  }
}

const defaultRoomsSearchIndex: RoomsSearchIndex = {
  currentIndex: "",
  index: {}
}

// TODO. MOVE
export interface RoomsStateEntities {
  [key: string]: Room
}
export interface RoomsState {
  allIds: RoomID[],
  entities: RoomsStateEntities,
}

const defaultRoomsState: RoomsState = {
  allIds: [],
  entities: {},
}

export interface SearchContextState {
  state: {
    activeFilters: ActiveFilters,
    roomsSearchIndex: RoomsSearchIndex,
    rooms: RoomsState,
    newRoomsNotification: boolean,
    roomsQty: number,
    roomsList: Room[],
    showMyRoomsFilter: boolean,
    loading: boolean,
    showRoomsWithMeFilter: boolean,
  },
  fns: {
    onChangeTextSearchItem: (value: string) => void,
    onChangeMyRooms: (value: boolean) => void
    onChangeRoomsWithMe: (value: boolean) => void
    onChangeNotEmpty: (value: boolean) => void
    onRoomClick: (id: string) => void
    onNewRoomGetClick: () => void
    onPaginationChange: (value: number) => void
  }
}

// @ts-ignore
const RoomListWidgetContext = createContext<SearchContextState>({})

export const useRoomsListWidgetContext = () => useContext(RoomListWidgetContext)

export const RoomsListWidgetContextProvider: FunctionComponent<{ activateMyRoomsFilter?: boolean }> = ({activateMyRoomsFilter = false, children}) => {
  const [activeFiltersState, setActiveFiltersState] = useState(defaultActiveFilterState)
  const [roomsSearchIndexState, setRoomsSearchIndexState] = useState(defaultRoomsSearchIndex)
  const [roomsState, setRoomsState] = useState(defaultRoomsState)
  const [newRoomsNotification, setNewRoomsNotification] = useState(false)
  const [roomsQty, setRoomsQty] = useState(1)
  const [inited, setInited] = useState(false)
  const [loading, setLoading] = useState(false)
  const {infra: {gqlApi}, selectors, routes: {roomById}} = useGlobalDependenciesContext()

  const history = useHistory();

  // SERVICES
  const roomsApi = useMemo(() => {
    return new RoomsApi(
      selectors.getMyId,
      gqlApi,
    )
  }, [selectors.getMyId, gqlApi])

  // REPOSITORIES
  const roomsRepository = useMemo(() => {
    return new RoomsRepository(
      roomsState,
      setRoomsState,
      roomsApi,
    )
  }, [])
  const roomsSubRepository = useMemo(() => {
    return new RoomsSubscriptionRepository(
      roomsApi,
      gqlApi,
    )
  }, [roomsApi, gqlApi])
  const mainRepo = useMemo(() => {
    return new MainRepository(
      roomsRepository,
      roomsSubRepository,
      {
        pushActiveFilters: (value: string) => {
          history.push(history.location.pathname + value)
        }
      },
      setActiveFiltersState,
      activeFiltersState,
      roomsSearchIndexState,
      setRoomsSearchIndexState,
      setNewRoomsNotification,
      setRoomsQty,
      setLoading,
    )
  }, [])
  // . REFRESH REPOS
  useMemo(() => {
    mainRepo.refreshState(
      activeFiltersState,
      roomsSearchIndexState,
    )
  }, [activeFiltersState, roomsSearchIndexState])
  useMemo(() => {
    roomsRepository.refreshState(
      roomsState,
    )
  }, [roomsState])

  // USE CASES
  const uc = useMemo(() => {
    return new RoomListUC(
      mainRepo,
      activateMyRoomsFilter,
    )
  }, [])
  const subUC = useMemo(() => {
    return new RoomsSubscriptionUC(
      roomsRepository,
      roomsSubRepository,
    )
  }, [])

  // . INIT
  useEffect(() => {
    uc.initRoomListWidget()
    return () => {
      subUC.stopAllSubscriptions()
    }
  }, [])

  // . ON LOCATION CHANGE
  const location = useLocation();
  useEffect(() => {
    const activeFilters = UrlService.translateUrlToSearchItemsEntity(location.search);
    // . If activefilters from url exist
    (async () => {
      if (activeFilters) {
        // . and make search
        await uc.setAndSearch(activeFilters)
        // . If no activefilters in URL, but app has just initialized
      } else if (!inited) {
        // . Than make search on default state
        await uc.search()
        // . Now widget is search is inited
        setInited(true)
      }
    })()
  }, [location])

  // . Subscribe on room update
  useMemo(() => {
    subUC.subscribeOnMultipleRoomUpdate(roomsState.allIds)
  }, [roomsState])

  const roomsList = useMemo(() => {
    const rooms = roomsSearchIndexState.index[roomsSearchIndexState.currentIndex]?.map((id) => roomsState.entities[id])
    return rooms || []
  }, [roomsState, roomsSearchIndexState])

  // . INIT CONTEXT VALUES
  const value: SearchContextState = useMemo(() => {
    const isAuthenticated = selectors.isAuthenticated()
    return {
      state: {
        activeFilters: activeFiltersState,
        roomsSearchIndex: roomsSearchIndexState,
        rooms: roomsState,
        newRoomsNotification,
        roomsQty,
        roomsList,
        showMyRoomsFilter: !activateMyRoomsFilter && isAuthenticated,
        showRoomsWithMeFilter: isAuthenticated,
        loading,
      },
      fns: {
        onChangeTextSearchItem: uc.onChangeTextSearchItem,
        onChangeMyRooms: uc.onChangeMyRooms,
        onChangeRoomsWithMe: uc.onChangeRoomsWithMe,
        onChangeNotEmpty: uc.onChangeNotEmpty,
        onPaginationChange: uc.onChangePageItem,
        onRoomClick: (id: string) => {
          history.push(roomById(id))
        },
        onNewRoomGetClick: () => {
          uc.search()
        }
      }
    }
  }, [
    roomsState,
    loading,
    activeFiltersState,
    roomsSearchIndexState,
    newRoomsNotification,
    roomsState,
    uc,
  ])

  return (
    <RoomListWidgetContext.Provider value={value}>
      { children }
    </RoomListWidgetContext.Provider>
  )
}
