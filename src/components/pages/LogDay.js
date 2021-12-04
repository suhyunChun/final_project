import React,{useState,useEffect} from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'
import {getCurrentUser} from "../../API/userApi";
import {getFormAPIMethod} from "../../API/formApi";

function LogDay(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const [edited,setEdited] = useState([])

/*    useEffect(()=>{
      getFormAPIMethod().then((form) => {
          console.log("set form in page", form)
          setQuestionList(form);
      });
    },[])*/

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
        console.log(e.target)
        /*
         check and post only modified one
         */
        for(let i = 0; i < edited.length;i++){

        }
        setEdited([])
        props.setQuestions(questionList)
    }
    const handleChange=(event)=>{
        let tmpQuestion=[...questionList]//for loop
        let tmp = {}
        let newAns = {}
        let idx = 0;
        for(let i = 0; i < tmpQuestion.length; i++){
            if(tmpQuestion[i].text === event.target.name){
                tmp = {...tmpQuestion[i]}
                idx = i
                if(tmpQuestion[i].type === 'radio' && event.target.name !== 'bool-opt'){
                    newAns = {date:props.shownDate, response:tmp.multiple&&(Object.values(tmp.multiple)).indexOf(event.target.value)}

                }else{
                    newAns = {date:props.shownDate,response:event.target.value}
                }
            }
        }

        let datesIdx = -1;
        for(let i = 0; i < tmpQuestion[idx].answer.length; i++){
            if(tmpQuestion[idx].answer[i].date.format('MM/DD/YYYY') === newAns.date.format('MM/DD/YYYY')){
                datesIdx = i;
            }
        }
        if (datesIdx !== -1) {
            tmpQuestion[idx].answer[datesIdx] = {...newAns}
        } else {
            tmpQuestion[idx].answer = tmpQuestion[idx].answer.concat(newAns)

        }
        setEdited(edited.concat([idx]))
        setQuestionList(tmpQuestion)
    }

    const handleFindValue = (data)=>{
        for(let i = 0; i < data.length;i++){
            if(data[i].date.format('MM/DD/YYYY') === props.shownDate.format('MM/DD/YYYY')){
                return data[i].res
            }
        }
        return ''
    }
    return(
        <React.Fragment>
            <div id="log-day">
                <div className = 'log-date' style={{height:71.83+'px'}}>
                    <ArrowBackIosIcon onClick={handlePastTime}/>
                    <span  style ={{fontSize:1.5+'em'}}><strong>{props.shownDate.format('MM/DD/YYYY')}</strong></span>
                    <ArrowForwardIosIcon onClick ={handleFutureTime} style={{color: (props.shownDate.format('MM/DD/YYYY')===props.currDate.format('MM/DD/YYYY')? 'darkgrey':'')}} />
                </div>
                {(questionList).map(item => (
                    <div className='question' id = {item._id} key={item._id} onChange={handleChange}>
                        <div className = 'log-text'>{item.text}</div>
                        {(()=>{
                            switch(item.type){
                                case 'boolean':
                                    return(<div className = 'bool'>
                                        <div className = 'bool-opt'>
                                            <input name = {item.text} type = 'radio' id = 't' defaultValue = 'true' defaultChecked={item.answer? handleFindValue(item.answer) ==='true' : ''} disabled={props.read}/>
                                            <label htmlFor='t'>True</label>
                                        </div>
                                        <div className = 'bool-opt'>
                                            <input name = {item.text} type = 'radio' id = 'f' defaultValue = 'false' defaultChecked={item.answer? handleFindValue(item.answer) ==='false':''} disabled={props.read}/>
                                            <label htmlFor='f'>False</label>
                                        </div>
                                    </div>)
                                case 'radio':
                                    return(
                                        <div className ='mult-opt'>
                                            <div className = 'opt' >
                                                <input name ={item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '' :item.multiple.first} defaultChecked={item.multiple === undefined ? '' : item.answer&&item.multiple.first ===Object.values(item.multiple)[handleFindValue(item.answer)]} disabled={props.read}/>
                                                <label  htmlFor={item.multiple === undefined? '':item.multiple.first}>{item.multiple === undefined? '':item.multiple.first}</label>
                                            </div>
                                            <div className='opt'>
                                                <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.second} defaultChecked={item.multiple === undefined ? '' : item.answer&& item.multiple.second ===Object.values(item.multiple)[handleFindValue(item.answer)]} disabled={props.read}/>
                                                <label htmlFor={item.multiple === undefined? '':item.multiple.second}>{item.multiple === undefined? '':item.multiple.second}</label>
                                            </div>
                                            <div className = 'opt'>
                                                <input name = {item.text} id = {item._id} type = 'radio' defaultValue = {item.multiple === undefined? '':item.multiple.third} defaultChecked={item.multiple === undefined ? '':item.answer&&(item.multiple.third ===Object.values(item.multiple)[handleFindValue(item.answer)])} disabled={props.read}/>
                                                <label  htmlFor={item.multiple === undefined? '':item.multiple.third}>{item.multiple === undefined? '':item.multiple.third}</label>
                                            </div>
                                        </div>)
                                case 'text':
                                    return(
                                        <input name = {item.text} type={item.type} className = 'edit-text' defaultValue ={item.answer ? handleFindValue(item.answer):''} disabled={props.read}/>
                                    )

                                default:
                                    return(
                                        <input name = {item.text} type={item.type} className = 'edit-text' style={{width:150+'px'}} defaultValue ={item.answer ?  handleFindValue(item.answer):''} disabled={props.read}/>)
                            }
                        })()}
                    </div>

                ))}
                <div className='save-div'>
                    <button type = 'submit' className = 'save' onClick={handleSubmit} style={{display: (props.read)?'none':''}}>
                        Submit
                    </button>
                </div>
            </div>

        </React.Fragment>
    );
}
export default LogDay
