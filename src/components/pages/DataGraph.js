import React from "react";
import groupByKey from '../../sample/test/groupByKey'
import TextTypeGraph from '../graph/TextTypeGraph'
import NumTypeGraph from "../graph/NumTypeGraph";
import BoolTypeGraph from "../graph/BoolTypeGraph";
import MultipleTypeGraph from "../graph/MultipleTypeGraph";


function DataGraph(props) {
    const data =groupByKey([...props.questions].sort((a,b)=>(a.date).diff(b.date)),'text')
    const question =  Object.keys(data)
   /* const textData = groupByKey([...data.filter((item)=> item.type === 'text')],'text')
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
        let a = Object.values(data[0].multiple)[0].toLowerCase()
        let b = Object.values(data[0].multiple)[1].toLowerCase()
        let c = Object.values(data[0].multiple)[2].toLowerCase()
        for(let i = 0; i < data.length;i++){
            if(data[i].answer.res === undefined){
                continue;
            }else if(Object.values(data[i].multiple)[data[i].answer.res].toLowerCase() === a){
                f+=1
            }else if(Object.values(data[i].multiple)[data[i].answer.res].toLowerCase() === b){
                s+=1
            }else if(Object.values(data[i].multiple)[data[i].answer.res].toLowerCase() === c){
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

export default DataGraph
