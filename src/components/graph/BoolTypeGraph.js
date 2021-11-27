import React, {useEffect, useState} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer
} from "recharts";

function BoolTypeGraph(props) {
    const data = Object.keys(props.boolData)
    const [newBoolData,setNewBoolData] = useState([])

    useEffect(()=>{
        let newData = []
        for(let i = 0; i < data.length;i++){
            let tNum = 0;
            let fNum = 0;
            let value = {}
            let q = props.boolData[data[i]]
            for(let j = 0; j < q.length; j++){
                if(q[j].answer.res === 'true'){
                    tNum += 1;
                }else if (q[j].answer.res ==='false'){
                    fNum += 1;
                }
            }
            value.text = data[i]
            value.true = tNum;
            value.false = fNum;
            value ={text:data[i], res:[{t : 'true', value:tNum},{t: 'false', value:fNum}]}
            newData = newData.concat(value)
            console.log(newData)
        }
        setNewBoolData(newData)
    },[])



    return(
        <React.Fragment>
            {newBoolData.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item.text}</h3>
                    <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                       <BarChart
                        width={400}
                        height={250}
                        data={item.res}>
                           <Tooltip/>
                        <XAxis dataKey='t' label={{marginTop:10+'px', textAnchor : 'middle', position: 'insideBottom', offset: 0 }}/>
                        <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} domain ={[0, 'dataMax']}/>
                        <Bar
                            dataKey='value'
                            fontFamily="sans-serif"
                            stroke="#f76b8a"
                            fill="#f76b8a"
                        />

                    </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </React.Fragment>
    );
}
export default BoolTypeGraph