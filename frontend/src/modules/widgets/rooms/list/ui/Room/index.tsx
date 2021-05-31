import {Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {FunctionComponent, memo} from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

interface RoomProps {
  id: string
  name: string
  description: string
  createdAt: Date
  activeMembersNumber: number
  author: string
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
    <Card className={classes.root} variant={"outlined"}>
      <CardContent>
        <Typography style={{cursor: "pointer"}} variant="body2" color="textSecondary" component="p" onClick={ () => onRoomClick(id) }>
          Name: { name }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Description: { description }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          CreatedAt: { createdAt.toISOString() }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ActiveMembersNumber: { activeMembersNumber }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Author: { author }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Closed: { `${closed}` }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default memo(Room)
