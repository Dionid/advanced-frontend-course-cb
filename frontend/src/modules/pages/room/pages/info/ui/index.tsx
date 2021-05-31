import {MainLayout} from "../../../../common/ui/MainLayout";
import {Grid} from "@material-ui/core";
import ChatWidget from "../widgets/ChatWidget/ui";
import {RoomInfoPageContextProvider, useRoomInfoPageContext} from "./contexts/RoomInfoPageContext";
import {useHistory, useParams} from "react-router-dom";
import * as React from "react";
import {useDidMountEffect} from "libs/react/hooks/useDidMountEffect";
import RoomInfo from "./RoomInfo";
import {withContext} from "../../../../../../libs/react/components/WithContext";
import {memo} from "react";

const RoomInfoPageInner = () => {
  const { id } = useParams() as { id: string }
  const history = useHistory()
  const { state } = useRoomInfoPageContext()
  const { roomData, showChatWidget, showVideoScreen } = state

  useDidMountEffect(() => {
    history.go(0)
  }, [id])

  return (
    <MainLayout>
      <Grid container justify={"center"} style={{padding: "30px 0", opacity: roomData.deleted ? "0.5" : "1", pointerEvents: roomData.deleted ? "none" : "all" }}>
        <Grid item xs={12}>
          <div style={{width: "100%", backgroundColor: "#eee", borderRadius: 20, height: 300, display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
              !showVideoScreen && <div>You have no access to video</div>
            }
          </div>
        </Grid>
        <Grid item sm={6}>
          <RoomInfo/>
          <div style={{paddingTop: 15}}>
            {
              showChatWidget && <ChatWidget roomId={id}/>
            }
          </div>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export const RoomInfoPage = memo(withContext(RoomInfoPageContextProvider, RoomInfoPageInner))
