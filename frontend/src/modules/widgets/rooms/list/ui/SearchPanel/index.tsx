import * as React from "react";
import {FunctionComponent, memo} from "react";
import {FormControlLabel, Grid, InputAdornment, makeStyles, Switch, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {useRoomsListWidgetContext} from "../contexts/RoomListWidgetContext";

const RoomListSearchPanel: FunctionComponent = function RoomListSearchPanel() {
  const {
    state,
    fns,
  } = useRoomsListWidgetContext()
  const {
    onChangeTextSearchItem,
    onChangeMyRooms,
    onChangeRoomsWithMe,
    onChangeNotEmpty,
  } = fns
  const {activeFilters, showMyRoomsFilter, showRoomsWithMeFilter} = state

  const handleChangeMyRooms = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMyRooms(event.target.checked)
  };

  const handleChangeRoomsWithMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRoomsWithMe(event.target.checked)
  };

  const handleChangeNotEmpty = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeNotEmpty(event.target.checked)
  };

  const onTextInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeTextSearchItem(event.currentTarget.value)
  }

  return (
    <Grid container direction="row" justify={"space-between"}>
      <Grid item>
        <Grid container alignItems={"center"}>
          <Grid item style={{paddingRight: "15px"}}>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
              }}
              id="input-with-icon-grid"
              variant={"outlined"}
              value={activeFilters.text.value}
              onChange={ onTextInputChange }
              label="Name Search" />
          </Grid>
          {/*<Grid item>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={activeFilters.tag.value}
                onChange={onChangeActiveTag}
                label="Tags"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  filters.tagList.map(tag => {
                    return <MenuItem key={tag.name} value={tag.name}>{ tag.name }</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>*/}
          {
            showMyRoomsFilter && (
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeFilters.myRooms.value}
                      onChange={handleChangeMyRooms}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Мои комнаты"
                />
              </Grid>
            )
          }
          {
            showRoomsWithMeFilter && (
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeFilters.roomsWithMe.value}
                      onChange={handleChangeRoomsWithMe}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Комнаты со мной"
                />
              </Grid>
            )
          }
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={activeFilters.notEmpty.value}
                  onChange={handleChangeNotEmpty}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Не пустые"
            />
          </Grid>
        </Grid>
      </Grid>
      {/*<Grid item>
        <Grid container>
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Вид отображения</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={""}
                // onChange={handleAgeChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Карточками</MenuItem>
                <MenuItem value={20}>Списком</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>*/}
    </Grid>
  )
}

export default memo(RoomListSearchPanel)
