import React,  { useEffect, useState }  from 'react';

import { getAllUniversities, setLoggedIn, searchByCountry, searchByName } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

function createTableData(name, country, websites) {
  return { name, country, websites };
}

const Universities = () => {
    const classes = useStyles();
    const [universities, setUniversities] = useState(null);
    const [universityData, setUniversityData] = useState(null);
    const [open, setOpen] = useState(true);
    const [loggedOut, setLoggedOut] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    }

    const handleChangeInput = (event) => {
        setSearchKey(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
      };
  
      const handleToggle = () => {
        setOpen(!open);
      };

      useEffect(() => {
        getAllUniversities().then((data) => {
            setUniversities(data);
        });
    }, []); 

    useEffect(() => {
        let universityRows = [];

        universities?.map((item, index) => {
            let tempData = createTableData(item.name, item.country, item.web_pages);
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
                    let tempData = createTableData(item.name, item.country, item.web_pages);
                    universityRows.push(tempData);
                });

                setUniversityData(universityRows);
            })
        } else if (searchBy === 'country') {
            let searchData = {
                country: searchKey
            }
            searchByCountry(searchData).then((data) => {
                data?.map((item, index) => {
                    let tempData = createTableData(item.name, item.country, item.web_pages);
                    universityRows.push(tempData);
                });

                setUniversityData(universityRows);
            })
        }
    }, [searchBy, searchKey]);

    return (
        <div className={classes.root}>
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
        </div>
    )

}

export default Universities;