import React, {useState} from "react";
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
    const [tmpData,setTmpData] = useState({...props.boolData})

    const formatDate =()=>{

    }

    return(
        <React.Fragment>
            {data.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    <button onClick={()=>console.log(tmpData[item].map(function(ans){
                        return ans.answer
                    }))}>test</button>
                    <BarChart
                        width={400}
                        height={250}
                        data={tmpData[item].map(function(ans){
                            return ans.answer
                        })}
                    >
                        <XAxis dataKey = 'res' fontFamily="sans-serif" allowDuplicatedCategory={false} />
                        <YAxis />
                        <Tooltip/>
                        <Bar
                            dataKey='res'
                            stackId = 'a'
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