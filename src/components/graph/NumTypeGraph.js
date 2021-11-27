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


function NumTypeGraph(props) {
    const data = Object.keys(props.numData)

    return(
        <React.Fragment>
            {data.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}> {item} </h3>
                    <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                    <LineChart
                        data={props.numData[item].map(function(ans){
                            return ans.answer
                        })}
                    >
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  label={{ value: 'Dates', marginTop:10+'px', textAnchor : 'middle', position: 'insideBottom', offset: 0 }} dataKey='date'>
                        </XAxis>
                        <YAxis dataKey={(v)=>parseInt(v.res)} label={{ value: 'Value', angle: -90, position: 'insideLeft' }} domain={[0,'dataMax']} allowDataOverflow={true} />
                        <Line type="monotone" dataKey="res" stroke="#f76b8a" strokeWidth={1.6} activeDot={{ r: 8 }}/>
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </React.Fragment>
    );
}
export default NumTypeGraph