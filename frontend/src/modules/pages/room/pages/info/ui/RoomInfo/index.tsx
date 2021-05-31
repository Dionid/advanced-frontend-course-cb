import {useRoomInfoPageContext} from "../contexts/RoomInfoPageContext";
import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import {Controller} from "react-hook-form";
import * as React from "react";
import {memo} from "react";

const RoomInfo = () => {
  const { state, permissions, fns } = useRoomInfoPageContext()
  const { roomData, editMode, control } = state
  const { canDelete, canEdit } = permissions
  const { onEdit, onCancelEditMode, onDelete, onSubmit } = fns
  return (
    <div style={{padding: 15}}>
      {
        !editMode && (
          <>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <h3>{ roomData.name }</h3>
              <div style={{display: "flex"}}>
                {
                  canEdit && (
                    <IconButton onClick={ onEdit }>
                      <Edit/>
                    </IconButton>
                  )
                }
                {
                  canDelete && (
                    <IconButton onClick={ onDelete }>
                      <Delete/>
                    </IconButton>
                  )
                }
              </div>
            </div>
            {
              roomData.description && (
                <Typography variant={"body1"}>
                  { roomData.description }
                </Typography>
              )
            }
          </>
        )
      }
      {
        editMode && (
          <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
            <Controller
              control={control}
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
              control={control}
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
              Save
            </Button>
            <Button variant="contained" color="default" onClick={ onCancelEditMode }>
              Cancel
            </Button>
          </form>
        )
      }
      <div style={{paddingTop: 15, opacity: 0.5}}>
        <Typography variant={"body1"}>
          Created by { roomData.author.username }
        </Typography>
        <Typography variant={"body1"}>
          { roomData.createdAt.toISOString() }
        </Typography>
      </div>
      <Typography variant={"body1"} style={{paddingTop: 30}}>
        👫 Members: { roomData.activeMembers.length }
      </Typography>
      <div style={{display:"flex", paddingTop: 15}}>
        {
          roomData.activeMembers.map( member => {
            return (
              <div key={ member.id } style={{display:"flex", justifyContent: "center", alignItems: "center", marginRight: 15}}>
                <div style={{padding: 20, backgroundColor: "#eee", borderRadius: "50%", marginRight: 15}}/>
                <div>
                  { member.username }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default memo(RoomInfo);
