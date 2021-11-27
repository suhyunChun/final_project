import React,{useState,useEffect} from "react";
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function MultipleTypeGraph(props) {
    const data = Object.keys(props.radioData)
    let newRadioData = {...props.radioData}

    useEffect(()=>{
        let first = 0;
        let second = 0;
        let third = 0;
        for(let i = 0; i < data.length;i++){
            let q = newRadioData[data[i]]
            for(let j = 0; j < q.length; j++){
                const valueArray = Object.values(q[j].multiple)
                q[j].answer.valueArray = valueArray;
                q[j].answer.ans = valueArray[q[j].answer.res]
            }
        }
    },[])


    return(
        <React.Fragment>
            {data.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>

                    <button onClick={()=>console.log(newRadioData[item],newRadioData[item].map(function(ans){
                            return ans.answer
                        }))}>test</button>
                    <ResponsiveContainer minWidth={260} minHeight={240}>
                        <BarChart
                            width={400}
                            height={250}
                            data={newRadioData[item].map(function(ans){
                                return ans.answer
                            })}
                        >
                            <XAxis label={{ value: 'Responses', marginTop:10+'px', textAnchor : 'middle', position: 'insideBottom', offset: 0 }} dataKey="valueArray" fontFamily="sans-serif" />
                            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} domain ={[0, 'dataMax']}/>
                            <Tooltip />
                            <Bar
                                dataKey='ans'
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