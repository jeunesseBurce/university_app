import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../../common/components/Button';
import Snackbar from '@material-ui/core/Snackbar';

import unilist_logo from '../../assets/unilist_logo.png';

import styled from 'styled-components';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';


const MainView = styled.div`
    background: rgb(26,66,142);
    background: linear-gradient(301deg, rgba(26,66,142,1) 22%, rgba(96,222,246,1) 57%);
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
    padding: 10px;
    height: 455px;
`;

const Footer = styled.div`
    height: 200px;
    border-top: 1px solid #ececec;
    margin-top: 50px;
    padding-top: 20px;
`;

const Headline = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #2f3b4b;
`;

const Section = styled.div`
    width: 100%;
    display: inline-grid;
    flex-direction: row;
`;


const LeftPanel = styled.div`
    justify-content: flex-start;
    margin: 0px 55px;
    flex-direction: column;
    border-right: 1px solid #ececec;
    padding: 70px;
    height: 305px;
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

const Caption = styled.div`
    font-size: 15px;
    color: #000000;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #00B2FF;
    font-weight: bold;
`;

const TitleSection = styled.div`
    margin: 15px;
    padding: 10px;
    width: 100%;
    flex-direction: row;
`;

const Registration = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cancel, setCancel] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const [msgFirstname, setMsgFirstname] = useState('');
    const [msgLastname, setMsgLastname] = useState('');
    const [msgEmail, setMsgEmail] = useState('');
    const [msgPassword, setMsgPassword] = useState('');
    const [errorFirstname, setErrorFirstname] = useState(false);
    const [errorLastname, setErrorLastname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);


    if (cancel) {
        return <Redirect to="/" />
    }

    const handleSignUp = () => {
        let data = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        }

        if (email === '' || isEmail(email) === false)  {
            setMsgEmail('Please provide a valid email.');
            setErrorEmail(true);
        }  else if (isEmail(email) === true) {
            setMsgEmail('');
            setErrorEmail(false);
        }
        if (password === '')  {
            setMsgPassword('Please provide a password.');
            setErrorPassword(true);
        } else {
            setMsgPassword('');
            setErrorPassword(false);
        }
        if (firstname === '')  {
            setMsgFirstname('Please provide your first name.');
            setErrorFirstname(true);
        } else {
            setMsgFirstname('');
            setErrorFirstname(false);
        }

        if (lastname === '')  {
            setMsgLastname('Please provide your last name.');
            setErrorLastname(true);
        } else {
            setMsgLastname('');
            setErrorLastname(false);
        }


        if (isEmail(email) === true && email && password && firstname && lastname) {
            setRegistered(true);
        }

    }

    const handleClose = () => {
        setOpen(false);
        setSnackMessage('');
    }

    return (
        <MainView>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={open}
            onClose={handleClose}
            message={snackMessage}
        />
            <LeftPanel>
                <img src={unilist_logo} width="550px" height="150px" alt="Logo" />
                <TitleSection>
                    <Title>Welcome to</Title>
                    <SubTitle> University List App </SubTitle>
                </TitleSection>
            </LeftPanel>
        <RightContent>
            <Container width="495px" height="700px">
            <Header>
                <Content>
                    <LeftContent> <Headline> Create an account </Headline> </LeftContent>     
                </Content>
            </Header>
                <MainContent>
                <Section>
                        <TextField
                            error={errorEmail}
                            id="email"
                            label="Email"
                            placeholder="abcd@gmail.com"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            required
                            helperText={msgEmail}
                        />
                    </Section>

                    <Section>
                        <TextField
                        error={errorPassword}
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="********"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        required
                        helperText={msgPassword}
                        />                   
                    </Section>
                    <Section>
                        <TextField
                                id="firstname"
                                label="First Name"
                                placeholder="Juan"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="outlined"
                                value={firstname}
                                onChange={(event) => {
                                    setFirstname(event.target.value)
                                }}
                                error={errorFirstname}
                                helperText={msgFirstname}
                                required
                            />
                    </Section>
                    <Section>
                        <TextField
                                id="lastname"
                                label="Last Name"
                                placeholder="de la Cruz"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="outlined"
                                value={lastname}
                                onChange={(event) => {
                                    setLastname(event.target.value)
                                }}
                                error={errorLastname}
                                helperText={msgLastname}
                                required
                            />
                    </Section>
                  
                    <Section>
                        <Caption> Already have login and password? <StyledLink to="/"> Sign in. </StyledLink> </Caption>
                    </Section>
                </MainContent>
                <Footer>
                    <RightContent> 
                        <Button
                        backgroundColor={null}
                        label="Cancel"
                        onClick={() => { setCancel(true)}}
                        primary={false}
                        size="medium"
                        />

                        <Button
                        backgroundColor={null}
                        label="Sign Up"
                        onClick={handleSignUp}
                        primary
                        size="medium"
                        />
                    </RightContent>
                </Footer>
            </Container>
        </RightContent>
        </MainView>
    )
 };

export default Registration;