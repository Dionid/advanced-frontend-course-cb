import * as React from "react";
import {FunctionComponent} from "react";
import {RoomCreateWidgetCtxProvider, useRoomCreateWidgetContext} from "./contexts/RoomCreateWidget";
import {Button, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import {withContext} from "../../../../../libs/react/components/WithContext";

const RoomCreateWidgetInner: FunctionComponent = () => {
  const {state, fns} = useRoomCreateWidgetContext()

  return (
    <form onSubmit={fns.onSubmit} style={{display: "flex", flexDirection: "column"}}>
      <Controller
        control={state.control}
        name="name"
        render={
          ({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                style={{paddingBottom: 15}}
                label="Name"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
              />
            )
          }
        }
      />
      <Controller
        control={state.control}
        name="description"
        render={
          ({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                style={{paddingBottom: 15}}
                label="Description"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
              />
            )
          }
        }
      />
      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </form>
  )
}

export const RoomCreateWidget = withContext(RoomCreateWidgetCtxProvider, RoomCreateWidgetInner)
