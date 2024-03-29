import React from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import moment from "moment";


function NumTypeGraph(props) {
    return(
        <React.Fragment>
            <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                    <LineChart
                        data={props.numData}
                    >
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  label={{ value: 'Dates', marginTop:10+'px', textAnchor : 'middle', position: 'insideBottom', offset: 0 }} dataKey={(v)=>moment(v.date).format('MM/DD/YYYY')}>
                        </XAxis>
                        <YAxis dataKey={(v)=>parseInt(v.response)} label={{ value: 'Value', angle: -90, position: 'insideLeft' }} domain={['dataMin','dataMax']}/>
                        <Line type="monotone" dataKey="response" stroke="#f76b8a" strokeWidth={1.6} activeDot={{ r: 8 }}/>
                    </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
export default NumTypeGraph