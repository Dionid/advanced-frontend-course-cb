import {RoomID} from "./rooms";

export interface TextSearchItem {
  value: string
}

export interface PageSearchItem {
  value: number
}

interface BooleanSearchItem {
  value: boolean
}

export interface MyRoomsSearchItem extends BooleanSearchItem {}
export interface RoomsWithMeSearchItem extends BooleanSearchItem {}
export interface NotEmptySearchItem extends BooleanSearchItem {}

export interface ActiveFilters {
  text: TextSearchItem,
  myRooms: MyRoomsSearchItem,
  roomsWithMe: RoomsWithMeSearchItem,
  notEmpty: NotEmptySearchItem,
  page: PageSearchItem,
}

export interface RoomsSearchIndex {
  currentIndex: string
  index: {
    [key: string] : RoomID[]
  }
}
