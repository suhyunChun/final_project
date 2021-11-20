import React,{useState} from "react";
import Nav from './Nav'
function LogDay(props) {
    return(
        <React.Fragment>
            <form>
                <div id="log-day">
                    <div className = 'log-date'>
                        {Date.now()}
                    </div>
                    <div className = 'log-form'>
                        {(props.questions).map(item => (
                            <div className='question' id = {item._id} key={item._id} >
                                {item.text}
                                <input type={item.type}/>
                            </div>

                        ))}
                    </div>
                    <button type = 'submit'>
                        Submit
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}
export default LogDay