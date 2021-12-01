import React from "react";

import TextTypeGraph from '../graph/TextTypeGraph'
import NumTypeGraph from "../graph/NumTypeGraph";
import BoolTypeGraph from "../graph/BoolTypeGraph";
import MultipleTypeGraph from "../graph/MultipleTypeGraph";


function DataGraph(props) {
    //sort((a,b)=>(a.answer.date).diff(b.answer.date))
    const data =[...props.questions]

    const formatData=(data)=>{
        for(let i = 0; i < data.length;i++){
            console.log(data[i].answer)
            let tmp = (data[i].answer).sort((a,b)=>a.date-b.date)
            console.log(data[i].answer,tmp)

        }
    }
    /*const textData = groupByKey([...data.filter((item)=> item.type === 'text')],'text')
    const numData = groupByKey([...data.filter((item)=> item.type === 'number')],'text')
    const radioData = groupByKey([...data.filter((item)=> item.type === 'radio')],'text')
    const boolData= groupByKey([...data.filter((item)=> item.type === 'boolean')],'text')*/

   /* const formatData = ()=>{
        let tData = []
        let nData = []
        let bData = []
        let rData = []
        if(Object.keys(textData)!==[]) {
            for (let i = 0; i < Object.keys(textData).length; i++) {
                tData = tData.concat([{
                    _id : textData[Object.keys(textData)[i]][0]._id,
                    text: Object.keys(textData)[i],
                    type: 'text',
                    ans: [...textData[Object.keys(textData)[i]]]
                }])
            }
        }
        if(Object.keys(numData)!==[]) {
            for (let j = 0; j < Object.keys(numData).length; j++) {
                nData = nData.concat([{
                    _id : numData[Object.keys(numData)[j]][0]._id,
                    text: Object.keys(numData)[j],
                    type: 'number',
                    ans: numData[Object.keys(numData)[j]]
                }])
            }
        }
        if(Object.keys(radioData)!==[]) {
            for (let i = 0; i < Object.keys(radioData).length; i++) {
                rData = rData.concat([{
                    _id : radioData[Object.keys(radioData)[i]][0]._id,
                    text: Object.keys(radioData)[i],
                    type: 'radio',
                    ans: radioData[Object.keys(radioData)[i]]
                }])
            }
        }
        if(Object.keys(boolData)!==[]) {
            for (let i = 0; i < Object.keys(boolData).length; i++) {
                bData = bData.concat([{
                    _id : boolData[Object.keys(boolData)[i]][0]._id,
                    text: Object.keys(boolData)[i],
                    type: 'boolean',
                    ans: boolData[Object.keys(boolData)[i]]
                }])
            }
        }

        return [...tData,...nData,...rData,...bData]
    }*/
    const formatBoolean=(data)=>{
        let tNum = 0;
        let fNum = 0;
        if(data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].res === 'true') {
                    tNum += 1;
                } else if (data[i].res === 'false') {
                    fNum += 1;
                }
            }
        }
        return [{t : 'true', value:tNum},{t: 'false', value:fNum}]
    }

    const formatMultiple = (data)=>{
        console.log(data)
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
            {data.map((item)=>(
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
/*case 'boolean':
return(
    <BoolTypeGraph data={data} boolData={formatBoolean(item.answer)}/>
)
case 'radio':
return(
    <MultipleTypeGraph data={data} radioData={formatMultiple(item.answer)}/>
)*/