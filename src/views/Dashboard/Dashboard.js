import React, { useEffect, useState } from 'react';

import { getAllUniversities, setLoggedIn, searchByCountry, searchByName } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../../services/api';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import RoomIcon from '@material-ui/icons/Room';
import unilist from '../../assets/unilist.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { Redirect } from "react-router-dom";

const drawerWidth = 240;
const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
  ];
 
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
        backgroundColor: '#0d4c84'
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
}));

const Title = styled.div`
    font-size: 30px;
    color: #002D62;
    margin: 30px;
    text-align: left;
`;

const RightPanel = styled.div`
    justify-content: center;
    display: flex;
    margin: 10px;
`;

const Results = styled.div`
  margin: 30px;
`;

const StyledSelect = styled(Select)`
    width: 120px;
    height: 50px;
    border-radius: 0px;
`;

const LabelSearch = styled.div`
    color: #FFFFFF;
    background-color: #0d4c84;
    text-align: center;
    padding: 15px;
    height: 50px;
    font-weight: bold;
`;

const StyledTextField = styled(TextField)`
   > div {
       height: 50px;
       border-radius: 0px;
   }
`;

function createAlertData(name, country, websites) {
    return { name, country, websites };
}
  

const Dashboard = (props) => {
    const { window } = props;
    const [universities, setUniversities] = useState(null);
    const [universityData, setUniversityData] = useState(null);
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const user = {email: localStorage.getItem('email')};
    const [loggedOut, setLoggedOut] = useState(false);
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    }

    const handleChangeInput = (event) => {
        setSearchKey(event.target.value);
    }
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };

    const handleLogout = () => {
        logout();
        setLoggedOut(false);
    }
  

    useEffect(() => {
        getAllUniversities().then((data) => {
            setUniversities(data);
        });
    }, []); 

    useEffect(() => {
        let universityRows = [];

        universities?.map((item, index) => {
            let tempData = createAlertData(item.name, item.country, item.web_pages);
            universityRows.push(tempData);
        });

        setUniversityData(universityRows);
    }, [universities]);

    useEffect(() => {      
        let universityRows = [];

        if (searchBy === 'name') {
            let searchData = {
                name: searchKey
            }
            searchByName(searchData).then((data) => {


                data?.map((item, index) => {
                    let tempData = createAlertData(item.name, item.country, item.web_pages);
                    universityRows.push(tempData);
                });

                console.log(universityRows);

                setUniversityData(universityRows);
            })
        } else if (searchBy === 'country') {
            let searchData = {
                country: searchKey
            }
            searchByCountry(searchData).then((data) => {

                data?.map((item, index) => {
                    let tempData = createAlertData(item.name, item.country, item.web_pages);
                    universityRows.push(tempData);
                });

                console.log(universityRows);

                setUniversityData(universityRows);
            })
        }
    }, [searchBy, searchKey]);

    if (loggedOut) {
        return <Redirect to="/" />
    }

    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button key="Dashboard">
                <ListItemIcon> <DashboardIcon color="primary" /> </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button key="Find a University">
                <ListItemIcon> <RoomIcon color="primary" /> </ListItemIcon>
                <ListItemText primary="Find a University" />
            </ListItem>

            <ListItem button key="All Universities">
                <ListItemIcon> <SchoolIcon color="primary" /> </ListItemIcon>
                <ListItemText primary="All Universities" />
            </ListItem>

            <ListItem button key="Favorite Universities">
                <ListItemIcon> <FavoriteIcon color="primary" /> </ListItemIcon>
                <ListItemText primary="Favorite Universities" />
            </ListItem>

            <ListItem button key="Subscribe">
                <ListItemIcon> <SubscriptionsIcon color="primary" /> </ListItemIcon>
                <ListItemText primary="Subscribe" />
            </ListItem>
          </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
        <Title> UNIVERSITIES AROUND THE WORLD </Title>
           
        <Results>
        {universities ?
        <>
            <RightPanel>
            <LabelSearch> SEARCH BY:  </LabelSearch>
            <FormControl variant="outlined" className={classes.formControl}>
            <StyledSelect
                labelId="select-search"
                id="select-search"
                value={searchBy}
                onChange={handleChangeSelect}
            >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="country">Country</MenuItem>
            </StyledSelect>
            </FormControl>
            <StyledTextField id="searchKey" variant="outlined" value={searchKey} onChange={handleChangeInput} placeholder="Search..." />
            </RightPanel>
            <DataTable rows={universityData} columns={columns} orderColumn="name"/>
        </>
        : <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
             <CircularProgress color="inherit" />
          </Backdrop>}
        </Results>
      </main>

        
        
    </div>   

    )


};

export default Dashboard;