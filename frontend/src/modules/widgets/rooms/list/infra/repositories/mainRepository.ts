import {ActiveFilters, RoomsSearchIndex} from "../../core/entities/search";
import {UrlService} from "../url/UrlService";
import {Room} from "../../core/entities/rooms";
import {RoomsRepository, RoomsSubscriptionRepository} from "../../core/usecases";

interface Router {
  pushActiveFilters(value: string): void
}

export class MainRepository {
  constructor(
    private roomRepository: RoomsRepository,
    private roomSubRepository: RoomsSubscriptionRepository,
    private router: Router,
    private saveActiveFiltersState: (value: ActiveFilters) => void,
    private activeFiltersState: ActiveFilters,
    private roomsSearchIndexState: RoomsSearchIndex,
    private saveRoomsSearchIndexState: (value: RoomsSearchIndex) => void,
    private setNewRoomsNotification: (value: boolean) => void,
    private setRoomsQty: (value: number) => void,
    private setLoading: (value: boolean) => void
  ) {}


  public refreshState(
    activeFiltersState: ActiveFilters,
    roomsSearchIndexState: RoomsSearchIndex,
  ) {
    this.activeFiltersState = activeFiltersState
    this.roomsSearchIndexState = roomsSearchIndexState
  }

  public saveActiveFilters = async (activeFilters: ActiveFilters) => {
    this.activeFiltersState = {
      ...this.activeFiltersState,
      ...activeFilters,
    }
    this.saveActiveFiltersState(this.activeFiltersState)
  }

  public searchByActiveFilters = async (activeFilters: ActiveFilters) => {
    const activeFiltersUrl = UrlService.translateActiveFiltersToUrl({
      ...this.activeFiltersState,
      ...activeFilters,
    })
    this.router.pushActiveFilters(activeFiltersUrl)
  }

  public getActiveFilters = async (): Promise<ActiveFilters> => {
    return this.activeFiltersState
  }

  private getRoomsFromCacheBySearchIndex = async (index: string): Promise<Room[] | void> => {
    // . Check if there is cached rooms on room
    const cachedIds = this.roomsSearchIndexState.index[index]
    if (!!cachedIds) {
      const rooms: Room[] = []
      for (let i = 0; i < cachedIds.length; i++) {
        const id = cachedIds[i]
        const room = await this.roomRepository.getRoomById(id)
        rooms.push(room)
      }
      return rooms
    }
    return
  }

  public fetchRoomsBySearch = async (activeFilters: ActiveFilters): Promise<Room[]> => {
    const index = JSON.stringify(activeFilters)

    await this.setLoading(true)
    // . Get rooms
    const [rooms, qty] = await this.roomRepository.fetchRoomsBySearchParams(
      activeFilters.page.value,
      activeFilters.text.value,
      activeFilters.myRooms.value,
      activeFilters.roomsWithMe.value,
      activeFilters.notEmpty.value,
    )
    this.setRoomsQty(qty)
    this.setNewRoomsNotification(false)
    this.roomSubRepository.unsubscribeOnNewRoomUpdate()

    let firstTime = true
    this.roomSubRepository.subscribeOnNewRoomUpdate(
      activeFilters.text.value,
      activeFilters.myRooms.value,
      activeFilters.roomsWithMe.value,
      activeFilters.notEmpty.value,
      (...args) => {
        if (firstTime) {
          firstTime = false
          return
        }
        // . Set "new rooms are here"
        this.setNewRoomsNotification(true)
      }
    )

    const ids = rooms.map((room) => room.id)

    // . Save rooms ids to roomsList
    this.roomsSearchIndexState = {
      currentIndex: index,
      index: {
        ...this.roomsSearchIndexState.index,
        [index]: ids,
      }
    }

    await this.saveRoomsSearchIndexState(this.roomsSearchIndexState)
    await this.setLoading(false)

    return rooms
  }
}
