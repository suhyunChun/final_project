import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function BoolTypeGraph(props) {
    //const booldata = Object.keys(props.boolData)
    /*    let newBoolData = []

        useEffect(()=>{
            let newData = []
            for(let i = 0; i < booldata.length;i++){
                let tNum = 0;
                let fNum = 0;
                let value = {}
                let q = props.boolData[booldata[i]]
                for(let j = 0; j < q.length; j++){
                    if(q[j].answer.res === 'true'){
                        tNum += 1;
                    }else if (q[j].answer.res ==='false'){
                        fNum += 1;
                    }
                }
                value.text = booldata[i]
                value.true = tNum;
                value.false = fNum;
                value ={_id: props.boolData[booldata[i]]._id, text:booldata[i], res:[{t : 'true', value:tNum},{t: 'false', value:fNum}]}
                newData = newData.concat(value)
            }
            newBoolData = [...newData]
            console.log('**')
        },[])*/


    return(
        <React.Fragment>
            <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                       <BarChart
                        width={400}
                        height={250}
                        data={props.boolData}>
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
        </React.Fragment>
    );
}
export default BoolTypeGraph