import React,{useState,useEffect} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'

function LogDay(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const handleFutureTime=()=>{
        if(props.shownDate.format('MM/DD/YYYY') < props.currDate.format('MM/DD/YYYY')){
            let tomorrow = moment(props.shownDate).add(1,'days')
            props.setShownDate(tomorrow)
        }
    }
    const handlePastTime=()=>{
        let yesterday = moment(props.shownDate).subtract(1,'days')
        props.setShownDate(yesterday)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        /*let chk = CheckInclude(questionList,props.shownDate.format('MM/DD/YYYY'))
        if(chk){
            let newQ = [...props.questions]
            let tmp = newQ.filter((item)=> item.date.format('MM/DD/YYYY') !== props.shownDate.format('MM/DD/YYYY'))
            props.setQuestions(tmp.concat(questionList))
        }else{*/
            props.setQuestions(questionList)
        //}
    }

    const handleChange=(event)=>{
        let tmpQuestion = [...questionList]
        for(let i = 0; i < tmpQuestion.length; i++){
            if(tmpQuestion[i].text === event.target.name){
                if(tmpQuestion[i].type === 'radio' && event.target.name !== 'bool-opt'){
                    tmpQuestion[i].answer = [props.shownDate, (Object.values(tmpQuestion[i].multiple)).indexOf(event.target.value)]
                }else{
                    tmpQuestion[i].answer = [props.shownDate, event.target.value]
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
                        <span  style ={{fontSize:1.5+'em'}}><strong>{props.shownDate.format('MM/DD/YYYY')}</strong></span>
                        <ArrowForwardIosIcon onClick ={handleFutureTime} style={{color: (props.shownDate.format('MM/DD/YYYY')===props.currDate.format('MM/DD/YYYY')? 'darkgrey':'')}} />
                    </div>
                        {(questionList.filter((item)=> item.date!==undefined?item.date.format('MM/DD/YYYY') === props.shownDate.format('MM/DD/YYYY'): true)).map(item => (
                            <div className='question' id = {item._id} key={item._id} onChange={handleChange}>
                                <div className = 'log-text'>{item.text}</div>
                                {(()=>{
                                    switch(item.type){
                                        case 'boolean':
                                            return(<div className = 'bool'>
                                                <div className = 'bool-opt'>
                                                    <input name = {item.text} type = 'radio' id = 't' defaultValue = 'true' defaultChecked={item.answer? item.answer[1] ==='true' : '' }/>
                                                    <label htmlFor='t'>True</label>
                                                </div>
                                                <div className = 'bool-opt'>
                                                    <input name = {item.text} type = 'radio' id = 'f' defaultValue = 'false' defaultChecked={item.answer? item.answer[1] ==='false':''}/>
                                                    <label htmlFor='f'>False</label>
                                                </div>
                                            </div>)
                                        case 'radio':
                                                return(
                                                    <div className ='mult-opt'>
                                                        <div className = 'opt' >
                                                            <input name ={item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '' :item.multiple.first} defaultChecked={item.multiple.first&&item.answer&&item.multiple.first ===Object.values(item.multiple)[item.answer[1]]}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.first}>{item.multiple === undefined? '':item.multiple.first}</label>
                                                        </div>
                                                        <div className='opt'>
                                                            <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.second} defaultChecked={item.multiple.second&& item.answer&& item.multiple.second ===Object.values(item.multiple)[item.answer[1]]}/>
                                                            <label htmlFor={item.multiple === undefined? '':item.multiple.second}>{item.multiple === undefined? '':item.multiple.second}</label>
                                                        </div>
                                                        <div className = 'opt'>
                                                            <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.third} defaultChecked={item.multiple.third && item.answer&&(item.multiple.third ===Object.values(item.multiple)[item.answer[1]])}/>
                                                            <label  htmlFor={item.multiple === undefined? '':item.multiple.third}>{item.multiple === undefined? '':item.multiple.third}</label>
                                                        </div>
                                                </div>)
                                        case 'text':
                                            return(
                                                <input name = {item.text} type={item.type} className = 'edit-text' defaultValue ={item.answer ? item.answer[1]  : ''}/>
                                            )

                                        default:
                                            return(
                                                <input name = {item.text} type={item.type} className = 'edit-text' style={{width:150+'px'}} defaultValue ={item.answer ? item.answer[1]  : ''}/>)
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
