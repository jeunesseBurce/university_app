import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { isLoggedIn, logout } from '../../services/api';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import unilist from '../../assets/unilist.png';
import Button from '../../common/components/Button/Button';

import { Redirect, useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
       
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#0d4c84',
        justifyContent: 'space-between',
        display: 'inline-flex'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        color: '#2f3b4b',
        fontWeight: '700'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    active: {
      backgroundColor: '#F4F4F4'
    },
    right: {
      justifyContent: 'flex-end'
    },
    toolbarContent: {
      display: 'inline-flex',
      justifyContent: 'space-between',
    }
}));

  
const ViewLayout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [loggedOut, setLoggedOut] = useState(false);
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const itemList = [
        {
          text: 'Dashboard',
          icon: <DashboardIcon color="primary" />,
          path: '/dashboard'
        },
        {
          text: 'All Universities',
          icon: <SchoolIcon color="primary" />,
          path: '/universities'
        },
        {
          text: 'Subscriptions',
          icon: <SubscriptionsIcon color="primary" />,
          path: '/subscriptions'
        },
      ]

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
      setLoggedOut(true);
      logout();
    }

    if (loggedOut) {
        return <Redirect to="/" />
    }

    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {itemList.map(item => {
              return (
               <ListItem 
                button 
                key={item.text} 
                onClick={() => history.push(item.path)}
                className={location.pathname == item.path ? classes.active : null}
               
               >
                <ListItemIcon> {item.icon} </ListItemIcon>
               <ListItemText primary={item.text} />
               </ListItem>
              );
            })}
          </List>
        </div>
    );

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarContent}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div>
            <img src={unilist} width="250px" height="70px" alt="Logo"/>
          </div>
          <div className={classes.right}>
            {isLoggedIn() ? 
              <Button size="small" onClick={handleLogout} label="Log out" />
            : null}
          </div>
 
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
      <div className={classes.toolbar} />
        <div> { children } </div>
      </main>
        
        
    </div>   

    )


};

ViewLayout.propTypes = {
  children: PropTypes.element
}


export default ViewLayout;