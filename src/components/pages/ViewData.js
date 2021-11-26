import React,{useState} from "react";
import LogDay from "./LogDay";
import DataGraph from './DataGraph'

function ViewData(props) {
    const [clicked, setClicked] = useState(true)
    const handleClicked = (e)=>{
        setClicked(e)
    }
    return(
        <React.Fragment>
            <div id="data">
                <button onClick = {()=>handleClicked(true)} style={{color: (clicked)? 'rgb(102, 191, 191)':''}}> Date </button>
                <button onClick = {()=>handleClicked(false)} style={{color: (clicked)? '':'rgb(102, 191, 191)'}}> Question </button>
                {clicked?
                    <div> <LogDay questions = {props.questions} setQuestions = {props.setQuestions} shownDate={props.shownDate} currDate={props.currDate} setShownDate = {props.setShownDate} read = {true}/> </div>
                    :
                    <div><DataGraph questions = {props.questions}/></div>}
            </div>
        </React.Fragment>
    );
}
export default ViewData

/*
                <LogDay questions ={props.questions} setQuestions ={props.setQuestions} readOnly= {true}/>
 */