import {Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {FunctionComponent, memo} from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    cursor: "pointer"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  closed: {
    opacity: 0.5,
    pointerEvents: "none"
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

interface RoomProps {
  id: string
  name: string
  description: string
  createdAt: Date
  activeMembersNumber: number
  author: {
    id: string
    username: string
  }
  onRoomClick: (id: string) => void
  closed: boolean
}

const Room: FunctionComponent<RoomProps> = function Room(props) {
  const {
    id,
    onRoomClick,
    name,
    description,
    createdAt,
    activeMembersNumber,
    author,
    closed,
  } = props
  const classes = useStyles()
  return (
    <Card className={clsx(classes.root, closed && classes.closed)} variant={"outlined"} onClick={ () => onRoomClick(id) }>
      <CardContent className={ classes.content }>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Typography style={{color: "#000"}} variant="body1" color="textSecondary" component="p">
            { name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            👫 { activeMembersNumber }
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p" style={{paddingTop: 5, marginBottom: 15}}>
          { description }
        </Typography>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: "auto"}}>
          <Typography variant="body2" color="textSecondary" component="p">
            { author.username }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { createdAt.toLocaleString("ru-RU") }
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(Room)
