import React,{useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'

function LogDay(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const currDate = moment();
    const [shownDate, setShownDate] = useState(currDate)

    const handleFutureTime=()=>{
        if(shownDate < currDate.subtract(1,'days')){
            let tomorrow = moment(shownDate).add(1,'days')
            setShownDate(tomorrow)
        }
    }
    const handlePastTime=()=>{
        let yesterday = moment(shownDate).subtract(1,'days')
        setShownDate(yesterday)
    }
    const handleSubmit=()=>{
        /*
        need to post data in server
         */
        console.log(questionList)
    }

    const handleChange=(event)=>{
        console.log("HANDLE CHANGE,",event.target)
    }
    return(
        <React.Fragment>
            <form>
                <div id="log-day">
                    <div className = 'log-date'>
                        <ArrowBackIosIcon onClick={handlePastTime}/>
                        {shownDate.format('MM/DD/YYYY')}
                        <ArrowForwardIosIcon onClick ={handleFutureTime}/>
                    </div>
                    <div className = 'log-form'>
                        {(questionList).map(item => (
                            <div className='question' id = {item._id} key={item._id} onChange={handleChange}>
                                {item.text}
                                <br/>
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
                                                    <br/>
                                                    <input name = 'multiple-radio' id = {item.multiple.second} type = 'radio' value = {item.multiple.second}/>
                                                    <label htmlFor={item.multiple.second}>{item.multiple.second}</label>
                                                    <br/>
                                                    <input name = 'multiple-radio' id = {item.multiple.third} type = 'radio' value = {item.multiple.third}/>
                                                    <label htmlFor={item.multiple.third}>{item.multiple.third}</label>
                                                    <br/>
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
