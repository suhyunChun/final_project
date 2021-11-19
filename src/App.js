import './App.css';
import Page from "./components/Page";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, {useState} from 'react'
import LogDay from "./components/pages/LogDay";
import EditQuestions from "./components/pages/EditQuestions";
import ViewData from "./components/pages/ViewData";
import ProfileForm from "./components/pages/ProfileForm";

function App() {
    const [questions, setQuestions] = useState([{text:'Number of push ups',type:'number'},
            {text:'Had a long walk today',type:'number'},
            {text:'One great thing that happened today',type:'text'},
            {text:'Today was a',type:'multiple'}])
      return (
          <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Login}/>
                  <Route exact path='/page' component={Page}/>
                  <Route exact path='/logday' component={()=><LogDay questions ={questions}/>}/>
                  <Route exact path='/edit' component={()=><EditQuestions questions = {questions} setQuestions ={setQuestions}/>}/>
                  <Route exact path='/data' component={ViewData}/>
                  <Route exact path='/profile' component = {ProfileForm}/>
              </Switch>
            </BrowserRouter>
          </div>
      );

}

export default App;