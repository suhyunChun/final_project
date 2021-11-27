import React from "react";

function TextTypeGraph(props) {
    const data = Object.keys(props.textData)

    return(
        <React.Fragment>
            {data.map((item)=>(
                <div className = 'graph'>
                    <h3 style={{color:'#075a7a'}}>{item}</h3>
                    {props.textData[item].map(function(ans){
                        return ans.answer
                    }).map((i)=>(
                        <div>
                            {i.date} : <strong>{i.res}</strong>
                        </div>
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}
export default TextTypeGraph