import * as React from "react";
import {Fragment, FunctionComponent, useCallback} from "react";
import {AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {Link, useHistory} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";
import {useGlobalModalContext} from "libs/react/components/GlobalModal";
import {RoomCreateWidget} from "../../../widgets/rooms/create/ui";
import {toast} from "react-toastify";
import {useGlobalDependenciesContext} from "../../../global/ui/contexts/GlobalDependenciesCtx";
import {canUserCreateRoom} from "../../../global/rooms/core/permissions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

// TODO. Refactore this shit
export const ProfileMenu: FunctionComponent = () => {
  const { usecases: {authNUC}, routes: {home, pa} } = useGlobalDependenciesContext()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const history = useHistory()

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const onLogoutClick = useCallback(() => {
    authNUC.logout()
    history.push(home())
    handleClose()
  }, [authNUC, handleClose])

  const onMyAccountClick = useCallback(() => {
    history.push(pa())
    handleClose()
  }, [handleClose])

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={onMyAccountClick}>My account</MenuItem>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export const ProfilePanel: FunctionComponent = () => {
  const { selectors, routes } = useGlobalDependenciesContext()

  if (selectors.isAuthenticated()) {
    return <ProfileMenu/>
  }

  return (
    <Fragment>
      <Link to={ routes.register() } style={{color: "inherit", textDecoration: "none"}}>
        <Button color="inherit">
          Register
        </Button>
      </Link>
      <Link to={ routes.login() } style={{color: "inherit", textDecoration: "none"}}>
        <Button color="inherit">
          Login
        </Button>
      </Link>
    </Fragment>
  )
}

const RoomCreateWidgetWrapper: FunctionComponent = () => {
  const gmCtx = useGlobalModalContext()
  const history = useHistory()
  const {routes: {roomById}} = useGlobalDependenciesContext()
  const onSuccess = (roomId: string) => {
    gmCtx.fns.closeGlobalModal()
    history.push(roomById(roomId))
    toast.success("Room created")
  }
  return (
    <div>
      <Paper style={{padding: 30}}>
        <RoomCreateWidget onSuccess={ onSuccess }/>
      </Paper>
    </div>
  )
}

export const MainLayout: FunctionComponent = ({children}) => {
  const classes = useStyles();
  const gmCtx = useGlobalModalContext()
  const { selectors, routes } = useGlobalDependenciesContext()
  const showCreateRoom = canUserCreateRoom(selectors.isAuthenticated)
  const showComrades = selectors.isAuthenticated()

  return (
    <Container>
      <AppBar position="static" color={'default'} variant={"outlined"} style={{margin: "15px 0 0 0", borderRadius: 5}}>
        <Toolbar>
          <Link to={"/"} style={{color: "inherit", textDecoration: "none"}}>
            <Typography variant={"h5"}>
              ClubHomie
            </Typography>
          </Link>
          <div style={{"marginRight": "auto", "marginLeft": 15}}>
            {
              showCreateRoom && (
                <Button color="inherit" onClick={ () => gmCtx.fns.showGlobalModal(<RoomCreateWidgetWrapper/>) }>
                  Create room
                </Button>
              )
            }
            {
              showComrades && (
                <Link to={ routes.comrades() } style={{color: "inherit", textDecoration: "none"}}>
                  <Button color="inherit">
                    Comrades
                  </Button>
                </Link>
              )
            }
          </div>
          <ProfilePanel/>
        </Toolbar>
      </AppBar>
      { children }
    </Container>
  )
}
