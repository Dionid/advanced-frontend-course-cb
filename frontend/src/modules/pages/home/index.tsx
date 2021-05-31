import * as React from "react"
import {MainLayout} from "../common/ui/MainLayout";
import {RoomsListWidget} from "../../widgets/rooms/list/ui";

export const HomePage = function HomePage() {
  return (
    <MainLayout>
      <div style={{paddingTop: 15}}>
        <RoomsListWidget/>
      </div>
    </MainLayout>
  )
}
