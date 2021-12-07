import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import LogDay from "./components/pages/LogDay";
import EditQuestions from "./components/pages/EditQuestions";
import ViewData from "./components/pages/ViewData";
import ProfileForm from "./components/pages/ProfileForm";
import moment from 'moment'
import {getCurrentUser,logInUsersAPIMethod} from "./API/userApi";
import {getFormAPIMethod} from "./API/formApi";
import CreateNewAccount from "./components/CreateNewAccount";

function App() {
    const currDate = moment();
    const [shownDate, setShownDate] = useState(currDate)
    const [questions, setQuestions] = useState([])
    const [user, setUser] = useState({})
    const [selected, setSelected] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

    useEffect(()=>{
        getFormAPIMethod()
            .then((res)=>{
                setQuestions(res)
            })
    },[user])

   /* useEffect(() => {
        if(user !== null && Object.entries(user).length !== 0){
            setLoginSuccess(true)
        }else{
            console.log(user)
            setLoginSuccess(false)
        }
    }, [user])
*/
    useEffect(() => {
       // console.log("useeffect")
        getCurrentUser()
            .then((obj)=>setUser(obj))
    },[loginSuccess])

    const handleOpen=(e)=>{
        e.preventDefault()
        setRegisterForm(true)
    }
    const handleClose=()=>{
        setRegisterForm(false)
    }
    const handleLogin=(e)=>{
        e.preventDefault()
        console.log(email,pass)

        logInUsersAPIMethod({email:email, password:pass})
            .then(response => response.json())
            .then(res => {
                if(res._id != null){
                    localStorage.setItem('loginSuccess',JSON.parse('true'));
                    setUser(res)
                }else{
                    localStorage.setItem('loginSuccess',JSON.parse('false'));
                }
            })
        .catch(err => alert('Login Error'));
    }
    const handleQ=(q)=>{
        console.log('Change Q to', q)
        setQuestions(q)
    }
    const onClickLink=(e)=>{
        setSelected(e.target.id)
    }
    const handleClick=()=>{
        getCurrentUser()
            .then((obj)=>setUser(obj))
    }

    const handleLocalValue =(obj)=>{
        localStorage.setItem('loginSuccess', obj)
        setUser({})
        console.log(JSON.parse(localStorage.getItem('loginSuccess')))
    }

    if(!JSON.parse(localStorage.getItem('loginSuccess'))) {
        return(
               <React.Fragment>
                   <div id="login">
                       <div className='login_header'>
                           <h1> Day Logger </h1>
                       </div>
                       <form className='login-content' onSubmit={handleLogin}>
                           <div className='form-group'>
                               <label htmlFor='login_email'>Email</label>
                               <br/>
                               <input id='login_email' type='text' className='formEmail'
                                      onChange={(e) => setEmail(e.target.value)}/>
                               <br/>
                               <label htmlFor='login_pass'>Password</label>
                               <br/>
                               <input type='password' id='login_pass' className='formPassword'
                                      onChange={(e) => setPass(e.target.value)}/>
                           </div>
                           <div className='loginBtnGroup'>
                               <button className='btn_login' onClick={handleLogin}>
                                   Log in
                               </button>
                               <button className='btn_createAccount' onClick={handleOpen} handleLocalValue={handleLocalValue}>
                                   Create New Account
                               </button>
                           </div>
                       </form>
                   </div>
                   <CreateNewAccount setName = {setName} registerForm={registerForm} handleClose={handleClose}
                                     handleLocalValue={handleLocalValue}
                                     />`
               </React.Fragment>
               );
    }else{
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <BrowserRouter>
                    <div className='nav_bar'>
                        <h1 id='nav-title'>Day Logger</h1>
                        <ul className='nav-link'>
                            <div id='nav-pages'>
                                <li>
                                    <Link to='/logday' id='logday' onClick={onClickLink} style={{
                                        color: (selected === 'logday') ? '#66bfbf' : '',
                                        textDecoration: (selected === 'logday') ? 'underline' : ''
                                    }}> Log Day </Link>
                                </li>
                                <li>
                                    <Link to='/edit' id='edit' onClick={onClickLink} style={{
                                        color: (selected === 'edit') ? '#66bfbf' : '',
                                        textDecoration: (selected === 'edit') ? 'underline' : ''
                                    }}> Edit Questions </Link>
                                </li>
                                <li>
                                    <Link to='/data' id='data' onClick={onClickLink} style={{
                                        color: (selected === 'data') ? '#66bfbf' : '',
                                        textDecoration: (selected === 'data') ? 'underline' : ''
                                    }}> View Data </Link>
                                </li>
                            </div>
                        </ul>
                        <div id='nav-profile'>
                            <Link to='/profile' onClick={onClickLink}>
                                <img
                                    className='profile_picture'
                                    src={user && user.profileImg ? user.profileImg : 'defaultProfile.png'}
                                    alt='profile'
                                    onClick={handleClick}
                                />
                            </Link>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/page' component={() => <App/>}/>
                        <Route exact path='/logday'
                               component={() => <LogDay questions={questions} setQuestions={handleQ}
                                                        shownDate={shownDate} setShownDate={setShownDate}
                                                        currDate={currDate} read={false}/>}/>
                        <Route exact path='/edit'
                               component={() => <EditQuestions questions={questions} setQuestions={handleQ}
                                                               shownDate={shownDate} user={user}/>}/>
                        <Route exact path='/data'
                               component={() => <ViewData questions={questions} setQuestions={handleQ}
                                                          shownDate={shownDate} setShownDate={setShownDate}
                                                          currDate={currDate}/>}/>
                        <Route exact path='/profile' component={() => <ProfileForm handleLocalValue={handleLocalValue} user={user} setUser={setUser}/>}/>
                    </Switch>
                </BrowserRouter>

            </div>

        );
    }

}

export default App;