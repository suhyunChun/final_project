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
  return (
      <div className="App">
        <header className="App-header">
        </header>
        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Login}/>
              <Route exact path='/page' component={Page}/>
              <Route exact path='/logday' component={LogDay}/>
              <Route exact path='/edit' component={EditQuestions}/>
              <Route exact path='/data' component={ViewData}/>
              <Route exact path='/profile' component = {ProfileForm}/>
          </Switch>
        </BrowserRouter>
      </div>
  );

}

export default App;