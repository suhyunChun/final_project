import React,{useState} from "react";
import moment from "moment";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

function TextTypeGraph(props) {
    const data = Object.keys(props.textData)
    const printResponse =(data)=>{
        let new_data = props.textData[data].map(function(ans){
            return ans.answer
        })
    }
    return(
        <React.Fragment>
            {data.map((item)=>(
                <div>
                    <span>{item}</span>
                    {props.textData[item].map(function(ans){
                        return ans.answer
                    }).map((i)=>(
                        <div>
                            {i.date} : {i.res}
                        </div>
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}
export default TextTypeGraph