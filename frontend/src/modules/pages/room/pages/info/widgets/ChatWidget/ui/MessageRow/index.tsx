import clsx from "clsx";
import {createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import {FunctionComponent} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      paddingBottom: 15,
      alignItems: "center",
      '&$my': {
        '& $messageData': {
          flexFlow: "row-reverse",
          marginLeft: "auto",
        },
        '& $messageBody': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        }
      },
      '&$onEdit': {
        '& $messageBody': {
          opacity: 0.5,
        }
      },
    },
    my: {},
    onEdit: {},
    messageData: {
      display: "flex",
      alignItems: "center"
    },
    messageBody: {
      padding: 15,
      backgroundColor: "#eee",
      borderRadius: "20px",
    },
    messageDate: {
      opacity: 0.5,
      padding: "10px",
    }
  }),
);

export interface MessageRowPropsMessage {
  isEditing: boolean
  mine: boolean
  author: {
    username: string
  }
  id: string
  createdAt: Date
  content: string
}

interface MessageRowProps {
  message: MessageRowPropsMessage,
  onEdit: () => void
  onDelete: () => void
}

export const MessageRow: FunctionComponent<MessageRowProps> = ({message, onEdit, onDelete}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.messageRow, message.isEditing && classes.onEdit, message.mine && classes.my)}>
      <div className={clsx(classes.messageData)}>
        <div className={classes.messageBody}>
          { message.content }
        </div>
        <div>
          <div className={classes.messageDate}>
            { message.author.username } <br/>
            { message.createdAt.toISOString() }
          </div>
        </div>
      </div>
      {
        message.mine && !message.isEditing && (
          <div style={{display: "flex"}}>
            <IconButton onClick={ onEdit }>
              <Edit/>
            </IconButton>
            <IconButton onClick={ onDelete }>
              <Delete/>
            </IconButton>
          </div>
        )
      }
    </div>
  )
}
