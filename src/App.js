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

function App() {
      const [questions, setQuestions] = useState([{_id : uuidv4(), text:'Number of push ups',type:'number'},
            {_id : uuidv4(), text:'Had a long walk today',type:'number'},
            {_id : uuidv4(), text:'One great thing that happened today',type:'text'},
            {_id : uuidv4(), text:'Today was a',type:'radio'}])

      const handleQ=(q)=>{
          setQuestions(q)
      }
      console.log("IN APP JS, questions",questions)
      return (
          <div className="App">
            <header className="App-header">
            </header>
                    <BrowserRouter>
                        <div className='nav_bar'>
                            <h1 id = 'nav-title'>Day Logger</h1>
                            <ul>
                                <li>
                                    <Link to ='/logday'> Log Day </Link>
                                </li>
                                <li>
                                    <Link to ='/edit'> Edit Questions </Link>
                                </li>
                                <li>
                                    <Link to ='/data'> View Data </Link>
                                </li>
                                <li>
                                    <Link to ='/profile'>
                                        <img
                                            className='profile_picture'
                                            src='defaultProfile.png'
                                            alt='profile'/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                      <Switch>
                          <Route exact path='/' component={Login}/>
                          <Route exact path='/page' component={Page}/>
                          <Route exact path='/logday' component={()=><LogDay questions ={questions}/>}/>
                          <Route exact path='/edit' component={()=><EditQuestions questions = {questions} setQuestions ={handleQ}/>}/>
                          <Route exact path='/data' component={ViewData}/>
                          <Route exact path='/profile' component = {ProfileForm}/>
                      </Switch>
                    </BrowserRouter>
              </div>

      );

}

export default App;