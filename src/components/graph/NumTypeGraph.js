import React,{useState} from "react";
import moment from 'moment'
import {
    Label,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    ReferenceArea
} from "recharts";


function NumTypeGraph(props) {
    const data = Object.keys(props.numData)

    return(
        <React.Fragment>
            {data.map((item)=>(
                <div>
                    <span> {item} </span>
                    <button onClick={()=>console.log(props.numData[item].map(function(ans){
                        return ans.answer
                    }))}>test</button>
                    <LineChart
                        width={400}
                        height={250}
                        data={props.numData[item].map(function(ans){
                            return ans.answer
                        })}
                    >
                        <Tooltip />
                        <Legend/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey='date'/>
                        <YAxis dataKey='res'/>
                        <Line type="monotone" dataKey="res" stroke="#f76b8a" activeDot={{ r: 8 }}/>
                    </LineChart>

                </div>
            ))}
        </React.Fragment>
    );
}
export default NumTypeGraph