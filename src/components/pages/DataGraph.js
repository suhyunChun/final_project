import React from "react";

import TextTypeGraph from '../graph/TextTypeGraph'
import NumTypeGraph from "../graph/NumTypeGraph";
import BoolTypeGraph from "../graph/BoolTypeGraph";
import MultipleTypeGraph from "../graph/MultipleTypeGraph";

function DataGraph(props) {
    const data =[...props.questions]

    const formatData=(data)=>{
        for(let i = 0; i < data.length;i++){
            let tmp = (data[i].answer).sort((a,b)=>a.date-b.date)
            data[i].answer = [...tmp]
        }
        return data
    }
    const formatBoolean=(data)=>{
        let tNum = 0;
        let fNum = 0;
        if(data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].response === 'true') {
                    tNum += 1;
                } else if (data[i].response === 'false') {
                    fNum += 1;
                }
            }
        }
        return [{t : 'true', value:tNum},{t: 'false', value:fNum}]
    }

    const formatMultiple = (data)=>{
        let f  = 0;
        let s = 0;
        let t = 0;
        let a = '';
        let b = '';
        let c = '';
        if(data.multiple) {
            a = Object.values(data.multiple)[0].toLowerCase()
            b = Object.values(data.multiple)[1].toLowerCase()
            c = Object.values(data.multiple)[2].toLowerCase()
            for (let i = 0; i < data.answer.length; i++) {
                if (data.answer === undefined) {
                    continue;
                } else if (Object.values(data.multiple)[data.answer[i].res].toLowerCase() === a) {
                    f += 1
                } else if (Object.values(data.multiple)[data.answer[i].res].toLowerCase() === b) {
                    s += 1
                } else if (Object.values(data.multiple)[data.answer[i].res].toLowerCase() === c) {
                    t += 1
                }
            }
        }
        return [{t:a,v:f},{t:b, v:s},{t:c, v:t}]
    }

    return(
        <React.Fragment>
            {formatData(data).map((item)=>(
                <div key = {item._id} className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item.text}</h3>
                    {(()=>{
                        switch(item.type){
                            case 'text':
                                return(
                                    <TextTypeGraph data={data} textData={item.answer}/>
                                )
                            case 'number':
                                return(
                                    <NumTypeGraph data={data} numData={item.answer}/>
                                )
                            case 'boolean':
                                return(
                                    <BoolTypeGraph data={data} boolData={formatBoolean(item.answer)}/>
                                )
                            case 'radio':
                                return(
                                    <MultipleTypeGraph data={data} radioData={formatMultiple(item)}/>
                                )
                            default:
                                return(<div>nothing</div>)
                        }
                    })()}

                </div>
            ))}
        </React.Fragment>
    );
}

export default DataGraph
