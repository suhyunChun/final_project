import './App.css';
import Page from "./components/Page";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route,Link } from 'react-router-dom';
import React, {useState} from 'react'
import LogDay from "./components/pages/LogDay";
import EditQuestions from "./components/pages/EditQuestions";
import ViewData from "./components/pages/ViewData";
import ProfileForm from "./components/pages/ProfileForm";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

function App() {
    const currDate = moment();
    const [shownDate, setShownDate] = useState(currDate)
    const [questions, setQuestions] = useState([{_id : uuidv4(), date: shownDate, text:'Number of push ups',type:'number', answer : []},
            {_id : uuidv4(), date: shownDate, text:'Had a long walk today',type:'number',answer : []}, /*number/string*/
            {_id : uuidv4(), date: shownDate, text:'One great thing that happened today',type:'text',answer : []}, /*string*/
            {_id : uuidv4(), date: shownDate, text:'Today was a',type:'radio', multiple : {first:'Ok day', second:'Bad day', third:'Great Day',}, answer : []},
        {_id : uuidv4(), date: moment(currDate).subtract(1,'days'), text:'Number of push ups',type:'number', answer : []},
        {_id : uuidv4(), date:  moment(currDate).subtract(1,'days'), text:'Had a long walk today',type:'number',answer : []}, /*number/string*/
        {_id : uuidv4(), date:  moment(currDate).subtract(1,'days'), text:'One great thing that happened today',type:'text',answer : []}, /*string*/
        {_id : uuidv4(), date:  moment(currDate).subtract(1,'days'), text:'Today was a',type:'radio', multiple : {first:'Ok day', second:'Bad day', third:'Great Day',}, answer : []},
        {_id : uuidv4(), date: moment(currDate).subtract(2,'days'), text:'Number of push ups',type:'number', answer : []},
        {_id : uuidv4(), date:  moment(currDate).subtract(2,'days'), text:'Had a long walk today',type:'number',answer : []}, /*number/string*/
        {_id : uuidv4(), date:  moment(currDate).subtract(2,'days'), text:'One great thing that happened today',type:'text',answer : []}, /*string*/
        {_id : uuidv4(), date:  moment(currDate).subtract(2,'days'), text:'Today was a',type:'radio', multiple : {first:'Ok day', second:'Bad day', third:'Great Day',}, answer : []},

    ]) /*question, **number(index)**, string(answer)*/
    const [user, setUser] = useState({profileImg : 'defaultProfile.png', name : 'test', email : 'test@test.com', location : 'songdo', locationDetail:'1'})
    const [selected, setSelected] = useState('')
    /*boolean, true/false
    * 1. answer array
    * 2. link to question's id
    * inlcude date, questions, answer
    * */

    const handleQ=(q)=>{
        console.log('Change Q to', q)
        setQuestions(q)
    }
    const onClickLink=(e)=>{
        setSelected(e.target.id)
    }
    console.log("IN APP JS, questions",questions)
    return (
          <div className="App">
            <header className="App-header">
            </header>
                    <BrowserRouter>
                        <div className='nav_bar'>
                            <h1 id = 'nav-title'>Day Logger</h1>
                            <ul className ='nav-link'>
                                <div id='nav-pages'>
                                    <li>
                                        <Link to ='/logday' id ='logday' onClick={onClickLink} style={{color : (selected === 'logday')? '#66bfbf' : '', textDecoration:(selected === 'logday')?'underline':''}}> Log Day </Link>
                                    </li>
                                    <li>
                                        <Link to ='/edit' id='edit' onClick={onClickLink} style={{color : (selected === 'edit')? '#66bfbf' : '', textDecoration:(selected === 'edit')?'underline':''}} > Edit Questions </Link>
                                    </li>
                                    <li>
                                        <Link to ='/data'  id='data' onClick={onClickLink} style={{color : (selected === 'data')? '#66bfbf' : '', textDecoration:(selected === 'data')?'underline':''}}> View Data </Link>
                                    </li>
                                </div>
                            </ul>
                            <div id ='nav-profile'>
                                <Link to ='/profile' onClick={onClickLink}>
                                    <img
                                        className='profile_picture'
                                        src='defaultProfile.png'
                                        alt='profile'/>
                                </Link>
                            </div>
                        </div>
                      <Switch>
                          <Route exact path='/' component={Login}/>
                          <Route exact path='/page' component={Page}/>
                          <Route exact path='/logday' component={()=><LogDay questions ={questions} setQuestions ={handleQ} shownDate={shownDate} setShownDate = {setShownDate} currDate={currDate} read ={false}/>}/>
                          <Route exact path='/edit' component={()=><EditQuestions questions = {questions} setQuestions ={handleQ} shownDate={shownDate}/>}/>
                          <Route exact path='/data' component={()=> <ViewData questions ={questions} setQuestions ={handleQ} shownDate={shownDate} setShownDate = {setShownDate} currDate={currDate}/>}/>
                          <Route exact path='/profile' component = {()=><ProfileForm user={user} setUser={setUser}/>}/>
                      </Switch>
                    </BrowserRouter>
              </div>

    );

}

export default App;