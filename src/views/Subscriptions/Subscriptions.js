import React, { useEffect, useState } from 'react';

import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
];

const Title = styled.div`
  font-size: 30px;
  color: #002D62;
  margin: 30px 0px;
  text-align: left;
`;

const StyledHeadline = styled(Typography)`
    font-size: 50px;
`;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    cardRoot: {
        width: '200px',
        margin: '30px 0px'
    },
    title: {
        fontSize: 14,
        },
        pos: {
        marginBottom: 12,
        },
}));

function createTableData(name, country, websites) {
    return { name, country, websites };
  }

const Subscriptions = () => {
    const classes = useStyles();
    const universities = localStorage.getItem('universities') ? JSON.parse(localStorage.getItem('universities')) : [];
    const [universityData, setUniversityData] = useState(null);
    const [numUniversities, setNumUniversities] = useState(0);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let universityRows = [];
        let num = 0;

        universities?.map((item) => {
            num += 1;
            let tempData = createTableData(item.name, item.country, item.web_pages);
            universityRows.push(tempData);
        });

        setUniversityData(universityRows);
        setNumUniversities(num);

    }, []);


    return (
        <Container>
           <Title> Subscribed Universities </Title>
           {universities ? 
           <>
           <Card className={classes.cardRoot}>
            <CardContent>
                <StyledHeadline>
                {numUniversities} 
                </StyledHeadline>
                {numUniversities > 0 ?
                <Typography variant="h5" component="h2">
                    universities
                </Typography>
                : 
                <Typography variant="h5" component="h2">
                    university
                </Typography>
                }
                <Typography className={classes.pos} color="textSecondary">
                currently in the list
                </Typography>
            </CardContent>
            </Card>

            {numUniversities === 0 ? <span> No results were found.  </span> 
               : <DataTable rows={universityData} columns={columns} orderColumn="name"/>
            }
            </>

            : 
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
             </Backdrop>}

        </Container>
    )

}

export default Subscriptions;