import React, {useState} from "react";
import LogDay from "./pages/LogDay";
import EditQuestions from "./pages/EditQuestions";
import ViewData from "./pages/ViewData";
import Nav from './pages/Nav'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./Login";
function Page() {
    return(
        <React.Fragment>
            <LogDay/>
        </React.Fragment>
    );

}


export default Page