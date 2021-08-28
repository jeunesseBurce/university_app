import React, { useEffect, useState } from 'react';
import { getAllUniversities } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import { groupBy } from '../../utils';
import styled from 'styled-components';
import ChartArea from '../../common/components/ChartArea/ChartArea';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const Title = styled.div`
  font-size: 30px;
  color: #002D62;
  margin: 30px 0px;
  text-align: left;
`;

const Results = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
`;

const columns = [
  { id: 'name', label: 'Country', width: 170, },
  { id: 'value', label: 'Number of Universities', minWidth: 100 },
];

const useStyles = makeStyles(() => ({
  root: {
      display: 'flex',
  },
  cardRoot: {
      width: '200px'
  },
  title: {
      fontSize: 14,
      },
      pos: {
      marginBottom: 12,
      },
}));

function createDetailsData(name, value) {
  return { name, value };
}

const Dashboard = () => {
  const classes = useStyles();
  const [universities, setUniversities] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
};

  useEffect(() => {
    let universityData = [];

    getAllUniversities().then((data) => {
      let groupedData = groupBy(data, 'country');

      groupedData?.map((item) => {
        let country = '';
        item.map(data => {
          country = data.country;
        });

        let tempData = createDetailsData(country, item.length);
        universityData.push(tempData);
      });

      setUniversities(universityData);
    });
}, []); 



  return (
    <Container>
      {universities ? 
      <>
      <Title> Number of Universities around the world </Title>
      <Results>
      <ChartArea data={universities} />
      <DataTable rows={universities} columns={columns} orderColumn="name" />
      </Results>
      </>
      : <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>}
    </Container>
  )

}

export default Dashboard;