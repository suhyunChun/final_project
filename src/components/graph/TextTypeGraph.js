import React from "react";

function TextTypeGraph(props) {
   // const data = Object.keys(props.textData)
    //console.log(props.textData[data[0]][0].answer)
    console.log(props.textData)
    return(
        <React.Fragment>
            <div>
                {props.textData.map((item)=>(
                    (item.answer.length !== 0?
                            (<p key = {item._id}>{item.answer.date} : {item.answer.res}</p>)
                            : ' ')

                ))}
            </div>
            {/*   {props.textData.map((item)=>(
                     <div className = 'graph' key = {props.textData[item][0]._id} >
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    {props.textData[item].map(function(ans){
                        return ans.answer
                    }).map((i)=>(
                        <div  key ={uuidv4()}>
                            {i.date} : <strong>{i.res}</strong>
                        </div>
                    ))}
                </div>
            ))}*/}
        </React.Fragment>
    );
}
export default TextTypeGraph