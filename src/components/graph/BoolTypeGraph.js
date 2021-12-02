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