import React,{useState} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'

function LogDay(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
   // const [answerArray,setAnswerArray] = useState([...props.questions.text])
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
                if(questionList.date === undefined){
            //add new
        }else {
            //updating
            props.setQuestions(questionList)
        }
         */
        let tmp =questionList.map(obj=> ({ ...obj, date: shownDate }))
        props.setQuestions(tmp)
    }

    const handleChange=(event)=>{
        let tmpQuestion = [...questionList]
        for(let i = 0; i < tmpQuestion.length; i++){
            if(tmpQuestion[i].text === event.target.name){
                if(tmpQuestion[i].type === 'radio' && event.target.name !== 'bool-opt'){
                    tmpQuestion[i].answer = (Object.values(tmpQuestion[i].multiple)).indexOf(event.target.value)
                }else{
                    tmpQuestion[i].answer = event.target.value
                }
            }
        }
        setQuestionList(tmpQuestion)

    }
    return(
        <React.Fragment>
                <div id="log-day">
                    <div className = 'log-date' style={{height:71.83+'px'}}>
                        <ArrowBackIosIcon onClick={handlePastTime}/>
                        <span  style ={{fontSize:1.5+'em'}}><strong>{shownDate.format('MM/DD/YYYY')}</strong></span>
                        <ArrowForwardIosIcon onClick ={handleFutureTime} style={{color: (shownDate.format('MM/DD/YYYY')===currDate.format('MM/DD/YYYY')? 'darkgrey':'')}} />
                    </div>
                        {(questionList).map(item => (
                            <div className='question' id = {item._id} key={item._id} onChange={handleChange}>
                                <div className = 'log-text'>{item.text}</div>
                                {(()=>{
                                    switch(item.type){
                                        case 'boolean':
                                            return(<div className = 'bool' value = {item.answer}>
                                                <div className = 'bool-opt'>
                                                    <input name = {item.text} type = 'radio' id = 't' defaultValue = 'true' defaultChecked={item.answer ==='true'}/>
                                                    <label htmlFor='t'>True</label>
                                                </div>
                                                <div className = 'bool-opt' value = {item.answer}>
                                                    <input name = {item.text} type = 'radio' id = 'f' defaultValue = 'false' defaultChecked={item.answer ==='false'}/>
                                                    <label htmlFor='f'>False</label>
                                                </div>
                                            </div>)
                                        case 'radio':
                                                return(
                                                    <div className ='mult-opt'>
                                                        <div className = 'opt' >
                                                            <input name ={item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '' :item.multiple.first} defaultChecked={item.multiple.first ===Object.values(item.multiple)[item.answer]}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.first}>{item.multiple === undefined? '':item.multiple.first}</label>
                                                        </div>
                                                        <div className='opt'>
                                                            <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.second} defaultChecked={item.multiple.second ===Object.values(item.multiple)[item.answer]}/>
                                                            <label htmlFor={item.multiple === undefined? '':item.multiple.second}>{item.multiple === undefined? '':item.multiple.second}</label>
                                                        </div>
                                                        <div className = 'opt'>
                                                            <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.third} defaultChecked={item.multiple.third ===Object.values(item.multiple)[item.answer]}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.third}>{item.multiple === undefined? '':item.multiple.third}</label>
                                                        </div>
                                                </div>)
                                        case 'text':
                                            return(
                                                <input name = {item.text} type={item.type} className = 'edit-text' defaultValue ={item.answer? item.answer : ''}/>
                                            )

                                        default:
                                            return(
                                                <input name = {item.text} type={item.type} className = 'edit-text' style={{width:150+'px'}} defaultValue ={item.answer? item.answer : ''}/>)
                                    }
                                })()}
                            </div>

                        ))}
                    <div className='save-div'>
                        <button type = 'submit' className = 'save' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>

        </React.Fragment>
    );
}
export default LogDay
