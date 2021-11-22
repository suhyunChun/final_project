import React,{useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'

function LogDay(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const [answerArray,setAnswerArray] = useState([])
    const currDate = moment();
    const [shownDate, setShownDate] = useState(currDate)

    const handleFutureTime=()=>{
        console.log(currDate,shownDate)
        if(shownDate.format('MM/DD/YYYY') < currDate.format('MM/DD/YYYY')){
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
                    <div className = 'log-date' style={{height:71.83+'px'}}>
                        <ArrowBackIosIcon onClick={handlePastTime}/>
                        <span  style ={{fontSize:1.5+'em'}}><strong>{shownDate.format('MM/DD/YYYY')}</strong></span>
                        <ArrowForwardIosIcon onClick ={handleFutureTime} style={{color: (shownDate.format('MM/DD/YYYY')==currDate.format('MM/DD/YYYY')? 'lightgrey':'')}} />
                    </div>

                        {(questionList).map(item => (
                            <div className='question' id = {item._id} key={item._id} onChange={handleChange}>
                                <div className = 'log-text'>{item.text}</div>
                                {(()=>{
                                    switch(item.type){
                                        case 'boolean':
                                            return(<div className = 'bool'>
                                                <div className = 'bool-opt'>
                                                    <input name = 'bool-opt' type = 'radio' id = 't' value = 'true'/>
                                                    <label htmlFor='t'>True</label>
                                                </div>
                                                <div className = 'bool-opt'>
                                                    <input name = 'bool-opt' type = 'radio' id = 'f' value = 'false'/>
                                                    <label htmlFor='f'>False</label>
                                                </div>
                                            </div>)
                                        case 'radio':
                                                return(
                                                    <div className ='mult-opt'>
                                                        <div className = 'opt'>
                                                            <input name = 'multiple-radio' id = {item._id} type = 'radio' value = {item.multiple === undefined? '' :item.multiple.first}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.first}>{item.multiple === undefined? '':item.multiple.first}</label>
                                                        </div>
                                                        <div className='opt'>
                                                            <input name = 'multiple-radio' id = {item._id} type = 'radio' value = {item.multiple === undefined? '':item.multiple.second}/>
                                                            <label htmlFor={item.multiple === undefined? '':item.multiple.second}>{item.multiple === undefined? '':item.multiple.second}</label>
                                                        </div>
                                                        <div className = 'opt'>
                                                            <input name = 'multiple-radio' id = {item._id} type = 'radio' value = {item.multiple === undefined? '':item.multiple.third}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.third}>{item.multiple === undefined? '':item.multiple.third}</label>
                                                        </div>
                                                </div>)
                                        case 'text':
                                            return(
                                                <input type={item.type} className = 'edit-text'/>
                                            )

                                        default:
                                            return(
                                                <input type={item.type} className = 'edit-text' style={{width:150+'px'}}/>)
                                    }
                                })()}
                            </div>

                        ))}
                    <div className='save-div'>
                        <button type = 'submit' className = 'save'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}
export default LogDay
