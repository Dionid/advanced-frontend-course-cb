import {MainLayout} from "../../../../common/ui/MainLayout";
import * as React from "react";
import {FunctionComponent, useState} from "react";
import {Button, Paper, Typography} from "@material-ui/core";
import {RoomsListWidget} from "../../../../../widgets/rooms/list/ui";
import {PersonalInfoWidgetInfoEdit} from "./InfoEdit";
import {PersonalInfoWidgetPasswordEdit} from "./PasswordEdit";
import {Me} from "../../../../../global/me/core/entities";
import {useGlobalDependenciesContext} from "../../../../../global/ui/contexts/GlobalDependenciesCtx";

interface PersonalInfoWidgetInfoProps {
  me: Me
  setEditInfoModeOn: () => void
  setEditPasswordModeOn: () => void
}

const PersonalInfoWidgetInfo: FunctionComponent<PersonalInfoWidgetInfoProps> = ({me, setEditInfoModeOn, setEditPasswordModeOn}) => {
  return (
    <>
      <div style={{display: "flex"}}>
        <Typography variant={"h4"}>
          { me.username }
        </Typography>
      </div>
      <Typography variant={"body1"}>
        { me.email }
      </Typography>
      <Typography variant={"body1"}>
        Since { me.registrationDate?.toLocaleDateString("ru-RU") }
      </Typography>
      <div style={{paddingTop: 15}}>
        <Button variant="contained" style={{}} color="primary" type="submit" onClick={setEditInfoModeOn}>
          Change info
        </Button>
        <Button variant="contained" style={{marginLeft: 15}} color="primary" type="submit" onClick={setEditPasswordModeOn}>
          Change password
        </Button>
      </div>
    </>
  )
}

enum MODS {
  "INFO",
  "EDIT_INFO",
  "EDIT_PASSWORD"
}

const PersonalInfoWidget = () => {
  const { selectors } = useGlobalDependenciesContext()
  const meModel = selectors.getMe()
  const me: Me = {
    ...meModel,
    registrationDate: new Date(meModel.registrationDate),
  }
  const [mode, setMode] = useState(MODS.INFO)

  return (
    <Paper variant={"outlined"} style={{padding: "30px"}}>
      {
        mode === MODS.INFO
        && <PersonalInfoWidgetInfo
            me={me}
            setEditInfoModeOn={() => { setMode(MODS.EDIT_INFO) }}
            setEditPasswordModeOn={() => { setMode(MODS.EDIT_PASSWORD) }}/>
      }
      {
        mode === MODS.EDIT_INFO
        && <PersonalInfoWidgetInfoEdit
            me={me}
            cancel={() => { setMode(MODS.INFO) }}/>
      }
      {
        mode === MODS.EDIT_PASSWORD
        && <PersonalInfoWidgetPasswordEdit
            me={me}
            cancel={() => { setMode(MODS.INFO) }}/>
      }
    </Paper>
  )
}

const MePageInner = () => {
  return(
    <>
      <div style={{padding: "15px 0"}}>
        <PersonalInfoWidget/>
      </div>
      <RoomsListWidget activateMyRoomsFilter={true}/>
    </>
  )
}

export const MePage = () => {
  return (
    <MainLayout>
      <MePageInner/>
    </MainLayout>
  )
}
