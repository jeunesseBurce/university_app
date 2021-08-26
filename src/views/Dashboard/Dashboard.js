import React, { useEffect, useState } from 'react';
import Header from '../../common/components/Header/Header';
import { getAllUniversities, setLoggedIn } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../services/api';

import { Redirect } from "react-router-dom";

const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
  ];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Title = styled.div`
    font-size: 50px;
    color: #002D62;
    margin: 10px;
    text-align: center;
`;

const Results = styled.div`
  margin: 30px;
`;

function createAlertData(name, country, websites) {
    return { name, country, websites };
}
  

const Dashboard = () => {
    const [universities, setUniversities] = useState(null);
    const [universityData, setUniversityData] = useState(null);
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const user = {email: localStorage.getItem('email')};
    const [loggedOut, setLoggedOut] = useState(false);

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

    if (loggedOut) {
        return <Redirect to="/" />
    }

    return (
    <div>
        
        <Header user={user} onLogout={handleLogout}/>
        <Results>
        {universities ? 
            <DataTable rows={universityData} columns={columns} />
        : <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
             <CircularProgress color="inherit" />
          </Backdrop>}
        </Results>
    </div>   

    )


};

export default Dashboard;