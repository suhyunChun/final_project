import React from "react";
import moment from "moment";

function TextTypeGraph(props) {

   // console.log(props.textData)
    return(
        <React.Fragment>
            <div>
                {props.textData.map((item)=>(
                    (item.length !== 0?
                            (<p key = {item.date}>{moment(item.date).format('MM/DD/YYYY')} : {item.response}</p>)
                            : ' ')

                ))}
            </div>
        </React.Fragment>
    );
}
export default TextTypeGraph