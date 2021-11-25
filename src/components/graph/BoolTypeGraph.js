import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function BoolTypeGraph(props) {
    const data = Object.keys(props.boolData)
    return(
        <React.Fragment>
            {data.map((item)=>(
                <div>
                    <span>{item}</span>
                    <button onClick={()=>console.log(props.boolData[item].map(function(ans){
                            return ans.answer
                        }))}>test</button>
                    <BarChart
                        width={400}
                        height={250}
                        data={props.boolData[item].map(function(ans){
                            return ans.answer
                        })}
                    >
                        <XAxis dataKey="res" fontFamily="sans-serif" />
                        <YAxis />
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
export default BoolTypeGraph