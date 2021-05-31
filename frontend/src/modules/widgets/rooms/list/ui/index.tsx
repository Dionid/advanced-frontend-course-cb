import {FunctionComponent, memo, useMemo} from "react";
import {Button, Grid, makeStyles,} from "@material-ui/core";
import SearchPanel from "./SearchPanel"
import Room from "./Room";
import Pagination from '@material-ui/lab/Pagination'
import {RoomsListWidgetContextProvider, useRoomsListWidgetContext} from "./contexts/RoomListWidgetContext";
import {withContext} from "../../../../../libs/react/components/WithContext";

const useStyles = makeStyles((theme) => ({
  searchPanel: {
    padding: theme.spacing(2),
  }
}));

const RoomsListWidgetInner = () => {
  const classes = useStyles()
  const {
    state,
    fns,
  } = useRoomsListWidgetContext()
  const {
    roomsList,
  } = state
  const {
    onRoomClick,
    onNewRoomGetClick,
    onPaginationChange,
  } = fns

  return (
    <Grid container style={{padding: "0 0 60px 0", opacity: state.loading ? "0.5" : "1", pointerEvents: state.loading ? "none" : "all",}}>
      <Grid container direction="row" justify={"space-between"} className={classes.searchPanel}>
        <SearchPanel/>
      </Grid>
      {
        state.newRoomsNotification && (
          <Grid>
            <Button color="primary" onClick={(ev) => onNewRoomGetClick()}>Get new rooms</Button>
          </Grid>
        )
      }
      <Grid item xs={12}>
        <Grid container style={{padding: "15px 0"}}>
          {
            roomsList.map((room) => {
              if (!room) return null
              return (
                <Grid item key={room.id} style={{padding: "15px", width: "33%", display: "flex", minHeight: 150}}>
                  <Room
                    id={room.id}
                    onRoomClick={ onRoomClick }
                    name={room.name}
                    description={room.description}
                    createdAt={room.createdAt}
                    activeMembersNumber={room.activeMembers.length}
                    author={room.author}
                    closed={!!room.deletedAt}
                  />
                </Grid>
              )
            })
          }
          {
            roomsList.length === 0 && <div style={{padding:15}}>No rooms found :(</div>
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Pagination count={Math.ceil(state.roomsQty / 9)} page={state.activeFilters.page.value} onChange={(ev, value) => onPaginationChange(value)}/>
      </Grid>
    </Grid>
  )
}

export const RoomsListWidget = memo(withContext(RoomsListWidgetContextProvider, RoomsListWidgetInner))
