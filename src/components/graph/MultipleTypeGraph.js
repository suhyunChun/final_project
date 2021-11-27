import React,{useState} from "react";
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function MultipleTypeGraph(props) {
    const data = Object.keys(props.radioData)


    return(
        <React.Fragment>
            {data.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    <button onClick={()=>console.log(props.radioData[item])}>test</button>
                    <ResponsiveContainer minWidth={260} minHeight={240}>
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

                        <Bar
                            dataKey='res'
                            fontFamily="sans-serif"
                        >
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>

                </div>
            ))}

        </React.Fragment>
    );
}
export default MultipleTypeGraph