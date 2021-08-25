import React, { useEffect, useState } from 'react';
import Header from '../../common/components/Header/Header';
import { getAllUniversities } from '../../services/api';
import DataTable from '../../common/components/DataTable/DataTable';
import styled from 'styled-components';


const columns = [
    { id: 'name', label: 'University Name', width: 170, },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'websites', label: 'Websites', minWidth: 100 },
  ];

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

    return (
    <div>
        <Header />
        <Title>  Find a university here </Title>
        <Results>

        {universities ? 
            <DataTable rows={universityData} columns={columns} />
        : null}
        </Results>
    </div>   

    )


};

export default Dashboard;