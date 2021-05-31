import {MainRepository} from "./index";
import {ActiveFilters} from "../entities/search";

export class RoomListUC {
  private inited = false
  private waitingForSearch = false
  private waitingForSetAndSearch: ActiveFilters | null = null

  constructor(
    private repo: MainRepository,
    private activateMyRoomsFilter: boolean,
  ) {

  }

  public initRoomListWidget = async () => {
    if (this.activateMyRoomsFilter) {
      await this.changeBooleanValue("myRooms", true)
    }

    this.inited = true

    if (this.waitingForSearch) {
      this.waitingForSearch = false
      await this.search()
    }
    if (this.waitingForSetAndSearch) {
      await this.setAndSearch(this.waitingForSetAndSearch)
      this.waitingForSetAndSearch = null
    }
  }

  private changePageItem = async (value: number) => {
    const activeFilters = await this.repo.getActiveFilters()
    await this.repo.saveActiveFilters({
      ...activeFilters,
      page: {
        value,
      }
    })
  }

  public onChangePageItem = async (value: number) => {
    await this.changePageItem(value)
    await this.requestSearch()
  }

  public resetPageItem = async () => {
    await this.changePageItem(1)
  }

  public onChangeTextSearchItem = async (value: string) => {
    await this.resetPageItem()
    const activeFilters = await this.repo.getActiveFilters()
    await this.repo.saveActiveFilters({
      ...activeFilters,
      text: {
        value,
      }
    })
    await this.requestSearch()
  }

  private changeBooleanValue = async (key: string, value: boolean) => {
    const activeFilters = await this.repo.getActiveFilters()
    await this.repo.saveActiveFilters({
      ...activeFilters,
      [key]: {
        value,
      }
    })
  }

  private onChangeBooleanValue = (key: string) => async (value: boolean) => {
    await this.resetPageItem()
    await this.changeBooleanValue(key, value)
    await this.requestSearch()
  }

  public onChangeMyRooms = this.onChangeBooleanValue("myRooms")
  public onChangeRoomsWithMe = this.onChangeBooleanValue("roomsWithMe")
  public onChangeNotEmpty = this.onChangeBooleanValue("notEmpty")

  public requestSearch = async () => {
    const activeFilters = await this.repo.getActiveFilters()
    await this.repo.searchByActiveFilters(activeFilters)
  }

  public setAndSearch = async (activeFilters: ActiveFilters) => {
    if (!this.inited) {
      this.waitingForSetAndSearch = activeFilters
      return
    }
    await this.repo.saveActiveFilters(activeFilters)
    await this.search()
  }

  public search = async () => {
    if (!this.inited) {
      this.waitingForSearch = true
      return
    }
    const activeFilters = await this.repo.getActiveFilters()
    await this.repo.fetchRoomsBySearch(activeFilters)
  }
}
