import React from "react";
import groupByKey from '../../sample/test/groupByKey'
import TextTypeGraph from '../graph/TextTypeGraph'
import NumTypeGraph from "../graph/NumTypeGraph";
import BoolTypeGraph from "../graph/BoolTypeGraph";
import MultipleTypeGraph from "../graph/MultipleTypeGraph";

/*1. A summary of responses organized by question
    • For "text" questions you can display all the responses one after another (sorted by date).
    • For “boolean” and “multiple choice” questions, you should make a bar graph showing each
    response and the number of counts for each.
    • For “number” questions the responses should be shown as a line graph, showing the
    numerical response for each given day.
    • For all the graphs, remember to provide appropriate axis / graph labels so that the data is
    understandable.
 */
function DataGraph(props) {
    const data =groupByKey([...props.questions].sort((a,b)=>(a.date).diff(b.date)),'text')
    const question =  Object.keys(data)
    /*const textData = groupByKey([...data.filter((item)=> item.type === 'text')],'text')
    const numData = groupByKey([...data.filter((item)=> item.type === 'number')],'text')
    const radioData = groupByKey([...data.filter((item)=> item.type === 'radio')],'text')
    const boolData= groupByKey([...data.filter((item)=> item.type === 'boolean')],'text')*/

    const formatBoolean=(data)=>{
        let tNum = 0;
        let fNum = 0;
        for(let i = 0; i < data.length;i++){
            if(data[i].answer.res==='true'){
                tNum += 1;
            }else if (data[i].answer.res === 'false'){
                fNum += 1;
            }
        }
        return [{t : 'true', value:tNum},{t: 'false', value:fNum}]
    }

    const formatMultiple = (data)=>{
        let f  = 0;
        let s = 0;
        let t = 0;
        let a = Object.values(data[0].multiple)[0]
        let b = Object.values(data[0].multiple)[1]
        let c = Object.values(data[0].multiple)[2]
        for(let i = 0; i < data.length;i++){
            if(Object.values(data[i].multiple)[data[i].answer.res] === a){
                f+=1
            }else if(Object.values(data[i].multiple)[data[i].answer.res] === b){
                s+=1
            }else if(Object.values(data[i].multiple)[data[i].answer.res] === c){
                t+=1
            }
        }
        return [{t:a,v:f},{t:b, v:s},{t:c, v:t}]
    }

       /*
           1. use map here, check question type -> render specific graph for the type

           2. calculation
        */

/* 1. go through all quesiton list -> check type
2. if questions is nums, render NumTypeGraph -> ? how to get all answers for specific questions?
  */
    return(
        <React.Fragment>
            {question.map((item)=>(
                <div key = {data[item][0]._id} className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    {(()=>{
                        switch(data[item][0].type){
                            case 'text':
                                return(
                                    <TextTypeGraph data={data} textData={data[item]}/>
                                )
                            case 'number':
                                return(
                                    <NumTypeGraph data={data} numData={data[item]}/>
                                )
                            case 'boolean':
                                return(
                                    <BoolTypeGraph data={data} boolData={formatBoolean(data[item])}/>
                                )
                            default:
                                return(
                                    <MultipleTypeGraph data={data} radioData={formatMultiple(data[item])}/>
                                )
                        }
                    })()}

                </div>
            ))}
        </React.Fragment>
    );
}





            /*<NumTypeGraph data={data} numData={numData}/>
            <TextTypeGraph data={data} textData={textData}/>
            <MultipleTypeGraph data = {data} radioData ={radioData}/>
            <BoolTypeGraph data={data} boolData = {boolData}/>*/
/*  {props.boolData.map((item)=>(
                <div key = {item._id} className = 'graph'>
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
 */
export default DataGraph
