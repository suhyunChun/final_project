import React,{useState} from "react";
import LogDay from "./LogDay";
import DataGraph from './DataGraph'

function ViewData(props) {
    console.log(props.questions)
    const [clicked, setClicked] = useState(true)
    const handleClicked = (e)=>{
        setClicked(e)
    }
    return(
        <React.Fragment>
            <div id="data">
                <button onClick = {()=>handleClicked(true)}> Date </button>
                <button onClick = {()=>handleClicked(false)}> Question </button>
                {clicked?
                    <div> <LogDay questions = {props.questions} setQuestions = {props.setQuestions} shownDate={props.shownDate} currDate={props.currDate} setShownDate = {props.setShownDate} readOnly = {true}/> </div>
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