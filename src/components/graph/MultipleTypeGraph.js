import React,{useState,useEffect} from "react";
import {Bar, BarChart,  ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function MultipleTypeGraph(props) {
    const data = Object.keys(props.radioData)
    const [newRadioData,setNewRadioData] = useState([])

    useEffect(()=>{
        let newData = []
        for(let i = 0; i < data.length;i++){
            let f  = 0;
            let s = 0;
            let t = 0;
            let value = {}
            let q = props.radioData[data[i]]
            let a = Object.values(q[0].multiple)[0]
            let b = Object.values(q[0].multiple)[1]
            let c = Object.values(q[0].multiple)[2]
            for(let j = 0; j < q.length; j++){
                if(Object.values(q[j].multiple)[q[j].answer.res] === a){
                    f += 1;
                }else if (Object.values(q[j].multiple)[q[j].answer.res] === b){
                    s += 1;
                }else if(Object.values(q[j].multiple)[q[j].answer.res] === c){
                    t += 1;
                }
            }
            value._id = props.radioData[data[i]][0]._id;
            value.text = data[i]
            value.res = [{t:a,v:f},{t:b, v:s},{t:c, v:t}]
            newData = newData.concat(value)
        }
        setNewRadioData(newData)
    },[])



    return(
        <React.Fragment>
            {newRadioData.map((item)=>(
                <div key = {item._id} className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item.text}</h3>
                        <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                        <BarChart
                            width={400}
                            height={250}
                            data={item.res}
                        >
                            <XAxis dataKey='t' label={{ value: 'Responses', marginTop:10+'px', textAnchor : 'middle', position: 'insideBottom', offset: 0 }}  fontFamily="sans-serif" />
                            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} domain ={[0, 'dataMax']}/>
                            <Tooltip />
                            <Bar
                                dataKey='v'
                                fontFamily="sans-serif"
                                stroke="#f76b8a"
                                fill="#f76b8a"
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