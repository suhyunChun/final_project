import React from "react";
import {Bar, BarChart,  ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function MultipleTypeGraph(props) {

    //console.log(props.radioData)
    return(
        <React.Fragment>
            <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
                <BarChart
                    width={400}
                    height={250}
                    data={props.radioData}
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
        </React.Fragment>
    );
}
export default MultipleTypeGraph