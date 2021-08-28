import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropType from 'prop-types';

const ChartArea = ({ data }) => {

    
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
            <BarChart
            width={1280}
            height={500}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
        </div>
      );
}


ChartArea.propTypes = {
    data: PropType.array,
    title: PropType.string
}

export default ChartArea;