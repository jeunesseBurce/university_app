import React from 'react';
import styled from 'styled-components';
import unilist_logo from '../../assets/unilist_logo.png';

import { Link } from "react-router-dom";


const MainView = styled.div`
    background: rgb(69,96,158);
    background: linear-gradient(313deg, rgba(69,96,158,1) 9%, rgba(32,226,179,1) 72%);
    height: 100vh;
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
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

const TitleSection = styled.div`
    margin: 15px;
    padding: 10px;
    width: 100%;
    flex-direction: row;
    text-align: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 30px;

    :hover {
        text-decoration: underline;
    }
`;

const TitleHeader = styled.div`
    font-size: 200px;
    text-align: center;
    color: #FFFFFF;
`;

const Header = styled.div`
    top: 0px;
`;

const NotFound = () => {
    return (
        <MainView>  
        <Header>
            <img src={unilist_logo} width="550px" height="150px" alt="Logo" />
        </Header>
              
        <Section>
            <TitleHeader> 
                404
            </TitleHeader>
            <TitleSection>
                <Title>Oops! The page was not found.</Title>
                <SubTitle> <StyledLink to="/">Go back to home</StyledLink> </SubTitle>
            </TitleSection>
        </Section>
    </MainView>
    );
};

export default NotFound;