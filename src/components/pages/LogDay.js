import React,{useState} from "react";

function LogDay(props) {

    const type_form=(type)=>{

    }
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
                                {(()=>{
                                    switch(item.type){
                                        case 'boolean':
                                            return(<div className = 'bool'>
                                                <input name = 'bool-opt' type = 'radio' id = 't' value = 'true'/>
                                                <label htmlFor='t'>true</label>
                                                <input name = 'bool-opt' type = 'radio' id = 'f' value = 'false'/>
                                                <label htmlFor='f'>false</label>
                                            </div>)
                                        case 'radio':
                                                return(<div className ='radio'>
                                                    <input name = 'multiple-radio' id = {item.multiple.first} type = 'radio' value = {item.multiple.first}/>
                                                    <label htmlFor={item.multiple.first}>{item.multiple.first}</label>
                                                    <input name = 'multiple-radio' id = {item.multiple.second} type = 'radio' value = {item.multiple.second}/>
                                                    <label htmlFor={item.multiple.second}>{item.multiple.second}</label>
                                                    <input name = 'multiple-radio' id = {item.multiple.third} type = 'radio' value = {item.multiple.third}/>
                                                    <label htmlFor={item.multiple.third}>{item.multiple.third}</label>
                                                </div>)

                                        default:
                                            return(
                                                <input type={item.type}/>)

                                    }
                                })()}
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

/*
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
 */