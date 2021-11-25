import React,{useState} from "react";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";

function MultipleTypeGraph(props) {
    const data = Object.keys(props.radioData)
    const value=(data)=>{

    }
    return(
        <React.Fragment>
            {data.map((item)=>(
                <div>
                    <span>{item}</span>
                    <button onClick={()=>console.log(props.radioData[item])}>test</button>
                    <BarChart
                        width={400}
                        height={250}
                        data={props.radioData[item].map(function(ans){
                            return ans.answer
                        })}
                    >
                        <XAxis dataKey="ans" fontFamily="sans-serif" />
                        <YAxis />
                        <Tooltip />
                        <Legend/>
                        <Bar
                            dataKey='res'
                            fontFamily="sans-serif"
                        >
                        </Bar>
                    </BarChart>


                </div>
            ))}

        </React.Fragment>
    );
}
export default MultipleTypeGraph