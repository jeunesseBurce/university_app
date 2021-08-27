import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


import Button from '../../common/components/Button/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import unilist_logo from '../../assets/unilist_logo.png';

import { Redirect, Link } from "react-router-dom";
import { login } from '../../services/api';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const MainView = styled.div`
    background: rgb(69,96,158);
    background: linear-gradient(313deg, rgba(69,96,158,1) 9%, rgba(32,226,179,1) 72%);
    height: 100vh;
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const Container = styled.div`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: #f8f8f8;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 10px 45px rgba(0,0,0,0.3);
    padding: 10px;
`;

const Header = styled.div`
    height: 50px;
    border-bottom: 1px solid #ececec;
    margin-bottom: 10px;
    padding: 10px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
`;

const LeftContent = styled(Content)`
    justify-content: flex-start;
`;

const RightContent = styled(Content)`
    justify-content: flex-end;
`;

const MainContent = styled.div`
    height: 300px;
    padding: 10px;
`;

const Footer = styled.div`
    height: 200px;
    border-top: 1px solid #ececec;
    margin-top: 10px;
    padding-top: 20px;
`;

const Title = styled.div`
    font-size: 50px;
    color: #002D62;
    > span {
        font-weight: 500;
    }
`;

const SubTitle = styled.div`
    font-size: 50px;
    color: #FFFFFF;
`;

const Headline = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #2f3b4b;
`;


const LeftPanel = styled.div`
    justify-content: flex-start;
    margin: 0px 55px;
    flex-direction: column;
    border-right: 1px solid #ececec;
    padding: 70px;
    height: 305px;
`;

const Section = styled.div`
    width: 100%;
    display: inline-grid;
    flex-direction: row;
`;

const TitleSection = styled.div`
    margin: 15px;
    padding: 10px;
    width: 100%;
    flex-direction: row;
`

const Caption = styled.div`
    font-size: 15px;
    color: #000000;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #00B2FF;
    font-weight: bold;
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(false);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };
  
    const handleEmailChange = (event) => {
        localStorage.setItem('email', event.target.value);
        setEmail(event.target.value);
        setError(false);
        setMessage('');
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError(false);
        setMessage('');
    }
    
    const submitLogin = (event) => {
        handleToggle();
        let data = {
            email: email,
            password: password
        }

        if (data.email && data.password) {
            setTimeout(login(data), 3000);
            setStatus(localStorage.getItem("isLoggedIn"));
            handleClose();
        } else {
            setError(true);
            setMessage("Invalid credentials");
            handleClose();
        }
    }


    if (status) {
        return <Redirect to="/dashboard" />
    }

    return (
    <MainView>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <LeftPanel>
            <img src={unilist_logo} width="550px" height="150px" alt="Logo" />
            <TitleSection>
                <Title>Welcome to</Title>
                <SubTitle> University List App </SubTitle>
            </TitleSection>
        </LeftPanel>
        <RightContent>
       <Container width="495px" height="495px" >
        <Header>
            <Content>
                <LeftContent> <Headline> Sign in to your account </Headline> </LeftContent>     
            </Content>
        </Header>
        <MainContent>
            <Section>              
                <TextField
                    error={error}
                    id="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    helperText={message}
                />             
            </Section>
            <Section>              
                <TextField
                    error={error}
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    helperText={message}
                />                       
            </Section>
            <Section>
                <Caption> Don't have an account? <StyledLink to="/registration"> Sign up here. </StyledLink> </Caption>     
            </Section>
        </MainContent>

        <Footer>
            <RightContent> 
                <Button
                backgroundColor={null}
                label="Cancel"
                onClick={() => {}}
                primary={false}
                size="medium"
                />

                <Button
                backgroundColor={null}
                label="Log In"
                onClick={submitLogin}
                primary
                size="medium"
                />
            </RightContent>
        </Footer>
        </Container>
        </RightContent>
       
    </MainView>
    );
};

export default Login;