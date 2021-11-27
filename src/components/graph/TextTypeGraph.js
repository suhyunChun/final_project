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
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    {props.textData[item].map(function(ans){
                        return ans.answer
                    }).map((i)=>(
                        <div>
                            {i.date} : <strong>{i.res}</strong>
                        </div>
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}
export default TextTypeGraph