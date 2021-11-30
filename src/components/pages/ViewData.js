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
                <div className = 'clearfix' style={{paddingBottom:3+'px'}}>
                <button onClick = {()=>handleClicked(true)} style={{border:1+'px solid black', fontSize : 1.5+'rem',padding : 7+'px', color: (clicked)? 'rgb(102, 191, 191)':'',backgroundColor :(clicked)? '#fcfefe' :'', borderRadius:10+'px'}}> Date </button>
                <button onClick = {()=>handleClicked(false)} style={{border:1+'px solid black', fontSize : 1.5+'rem',padding : 7+'px', color: (clicked)? '':'rgb(102, 191, 191)',backgroundColor :(clicked)? '':'#fcfefe',borderRadius:10+'px' }}> Question </button>
                </div>
                    {clicked?
                    <div className = 'viewData'> <LogDay questions = {props.questions} setQuestions = {props.setQuestions}
                                                         shownDate={props.shownDate} currDate={props.currDate}
                                                         setShownDate = {props.setShownDate} read = {true}/> </div>
                    :
                      <DataGraph questions = {props.questions}/>}
                <button className = 'save' style ={{marginTop:3+'px'}}>
                    <a
                        style={{textDecoration:'none',color:'white'}}
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(props.questions))}`}
                        download="logData.json">Download the data</a></button>
            </div>
        </React.Fragment>
    );
}
export default ViewData

/*
                <LogDay questions ={props.questions} setQuestions ={props.setQuestions} readOnly= {true}/>
                <a
  className="pull-right btn btn-primary"
  style={{ margin: 10 }}
  href={`data:text/json;charset=utf-8,${encodeURIComponent(
  JSON.stringify(this.props.objectToDownload)
  )}`}
  download="data.json"
>
  DOWNLOAD DATA AS JSON
</a>
 */