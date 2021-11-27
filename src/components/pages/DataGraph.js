import React from "react";
import groupByKey from '../../sample/test/groupByKey'
import TextTypeGraph from '../graph/TextTypeGraph'
import NumTypeGraph from "../graph/NumTypeGraph";
import BoolTypeGraph from "../graph/BoolTypeGraph";
import MultipleTypeGraph from "../graph/MultipleTypeGraph";

function DataGraph(props) {
    const data = [...props.questions].sort((a,b)=>(a.date).diff(b.date))
    const textData = groupByKey([...data.filter((item)=> item.type === 'text')],'text')
    const numData = groupByKey([...data.filter((item)=> item.type === 'number')],'text')
    const radioData = groupByKey([...data.filter((item)=> item.type === 'radio')],'text')
    const boolData= groupByKey([...data.filter((item)=> item.type === 'boolean')],'text')

   // console.log(textData,numData,radioData,boolData)


    /*
    1. A summary of responses organized by question
        • For "text" questions you can display all the responses one after another (sorted by date).
        • For “boolean” and “multiple choice” questions, you should make a bar graph showing each
        response and the number of counts for each.
        • For “number” questions the responses should be shown as a line graph, showing the
        numerical response for each given day.
        • For all the graphs, remember to provide appropriate axis / graph labels so that the data is
        understandable.
     */
    return(
        <React.Fragment>
            <NumTypeGraph data={data} numData={numData}/>
            <TextTypeGraph data={data} textData={textData}/>
            <MultipleTypeGraph data = {data} radioData ={radioData}/>
            <BoolTypeGraph data={data} boolData = {boolData}/>
        </React.Fragment>
    );
}
export default DataGraph
