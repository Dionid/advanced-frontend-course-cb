import {createStyles, IconButton, InputBase, makeStyles, Theme} from "@material-ui/core";
import {Cancel, Send} from "@material-ui/icons";
import {ChatWidgetContextProvider, useChatWidgetContext} from "./contexts/ChatWidgetContext";
import {FunctionComponent, memo, useEffect, useRef} from "react";
import {MessageRow} from "./MessageRow";
import {withContext} from "../../../../../../../../libs/react/components/WithContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      padding: 15,
      flex: 1,
    },
    iconButton: {
      padding: 10,
      borderRadius: 0,
      borderBottomRightRadius: 20
    },
    divider: {
      height: 28,
      margin: 4,
    },
    form: {
      display: "flex"
    },
  }),
);

const ChatWidget = () => {
  const classes = useStyles();
  const { state, fns } = useChatWidgetContext();
  const { setNewMessage, onNewMessageSubmit, onDelete, onEdit, onCancelEdit } = fns
  const { allMessages, newMessage, editModeMessageId } = state
  const messagesWindow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = messagesWindow.current
    if (el) {
      // TODO. Add logic that if it is not on the bottom, than do NOT scroll
      el.scrollTop = el.scrollHeight
    }
  }, [allMessages.length])

  return (
    <div style={{display: "flex", flexDirection: "column", borderRadius: "20px", border: "1px #eee solid"}}>
      <div ref={messagesWindow} style={{padding: 15, display: "flex", flexDirection: "column", overflow: "auto", maxHeight: "400px"}}>
        {
          allMessages.map( message => {
            return (
              <MessageRow
                key={ message.id }
                message={message}
                onDelete={ () => onDelete(message.id) }
                onEdit={ () => onEdit(message.id) }
              />
            )
          })
        }
        {
          allMessages.length === 0 && (
            <div style={{textAlign: "center"}}>No messages</div>
          )
        }
      </div>
      <div style={{borderTop: "1px #eee solid"}}>
        <form onSubmit={(event) => {
          event.preventDefault()
          onNewMessageSubmit(newMessage)
        }} className={classes.form}>
          <InputBase
            className={classes.input}
            placeholder="Enter message"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.currentTarget.value)}
          />
          {
            editModeMessageId && (
              <IconButton onClick={ onCancelEdit }>
                <Cancel/>
              </IconButton>
            )
          }
          <IconButton type="submit" className={classes.iconButton} aria-label="send">
            <Send />
          </IconButton>
        </form>
      </div>
    </div>
  )
}

export default memo(withContext(ChatWidgetContextProvider, ChatWidget))
