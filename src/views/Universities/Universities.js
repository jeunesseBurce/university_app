import React,  { useEffect, useState }  from 'react';

import { getAllUniversities, searchByCountry, searchByName } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '../../common/components/Button/Button';
import Modal from '../../common/components/Modal/Modal';
import DialogContentText from '@material-ui/core/DialogContentText';
import Container from '@material-ui/core/Container';
import isEmail from 'validator/lib/isEmail';

const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
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

const StyledHeadline = styled(Typography)`
    font-size: 50px;
`;

const Title = styled.div`
  font-size: 30px;
  color: #002D62;
  margin: 30px 0px;
  text-align: left;
`;

const RightPanel = styled.div`
  justify-content: flex-end;
  display: flex;
  margin: 10px 0px;
  width: 100%;
`;

const Footer = styled.div`
 justify-content: flex-end;
 margin: 10px 0px;
`;

const Results = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
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
    const [searchKey, setSearchKey] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [numUniversities, setNumUniversities] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [subscribeText, setSubscribeText] = useState('Subscribe');
    const [inputEmail, setInputEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleClickOpen = () => {
      setOpenModal(true);
      setSubscribeText('Subscribed');
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };

    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    };

    const handleChangeInput = (event) => {
        setSearchKey(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };
  

    const handleEmailChange = (event) => {
        setErrorEmail(false);
        setErrorMsg('');
        setInputEmail(event.target.value);
    };

    const handleSubscribe = () => {
        if (inputEmail === '' || isEmail(inputEmail) === false) {
            setErrorMsg('Please provide a valid email.');
            setErrorEmail(true);
        } else if (isEmail(inputEmail) === true) {
            localStorage.setItem('universities', JSON.stringify(universities)); 
            handleCloseModal();
        }
    };

    useEffect(() => {
        getAllUniversities().then((data) => {
            setUniversities(data);
        });
    }, []); 

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
    }, [universities]);

    useEffect(() => {      
        if (searchBy === 'name') {
            let searchData = {
                name: searchKey
            }
            searchByName(searchData).then((data) => {
               setUniversities(data);
            })
        } else if (searchBy === 'country') {
            let searchData = {
                country: searchKey
            }
            searchByCountry(searchData).then((data) => {
                setUniversities(data);
            })
        }
    }, [searchBy, searchKey]);

    return (
        <Container>           
           <Results>
           <Modal 
            open={openModal} 
            dialogLabel="Subscribe" 
            handleClose={handleCloseModal}
            primaryButton="Subscribe"
            secondaryButton="Cancel"
            handleClickPrimary={handleSubscribe}
           >
            <DialogContentText>
                To subscribe to this university list, please enter your email address here.
            </DialogContentText>
            <TextField
                error={errorEmail}
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={handleEmailChange}
                value={inputEmail}
                helperText={errorMsg}
            />
            </Modal>
           {universities ?
           <>
              <Title> UNIVERSITY LIST</Title>
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
               {numUniversities === 0 ? <span> No results were found.  </span> 
               : <DataTable rows={universityData} columns={columns} orderColumn="name"/>
               }

               <Footer>
                <Button onClick={handleClickOpen} label={subscribeText} size="large" primary/>
               </Footer>
           </>
           : <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
             </Backdrop>}
           </Results>
        </Container>
    )

}

export default Universities;