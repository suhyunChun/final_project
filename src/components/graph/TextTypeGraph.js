import React from "react";

function TextTypeGraph(props) {

    return(
        <React.Fragment>
            <div>
                {props.textData.map((item)=>(
                    (item.length !== 0?
                            (<p key = {item.date}>{item.date.format('MM/DD/YYYY')} : {item.res}</p>)
                            : ' ')

                ))}
            </div>
        </React.Fragment>
    );
}
export default TextTypeGraph