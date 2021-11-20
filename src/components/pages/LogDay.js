import React,{useState} from "react";

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
                                {item.type ==='radio' && item.multiple !== undefined?
                                    <div className ='radio'>
                                        <input name = 'multiple-radio' id = {item.multiple.first} type = 'radio' value = {item.multiple.first}/>
                                        <label htmlFor={item.multiple.first}>{item.multiple.first}</label>
                                        <input name = 'multiple-radio' id = {item.multiple.second} type = 'radio' value = {item.multiple.second}/>
                                        <label htmlFor={item.multiple.second}>{item.multiple.second}</label>
                                        <input name = 'multiple-radio' id = {item.multiple.third} type = 'radio' value = {item.multiple.third}/>
                                        <label htmlFor={item.multiple.third}>{item.multiple.third}</label>
                                    </div>
                                    :<input type={item.type}/>}
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