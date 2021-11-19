import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import CreateNewAccount from "./CreateNewAccount";

function Login({handleLogged }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [registerForm, setRegisterForm] = useState(false)
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const history = useHistory();
    const handleOpen=(e)=>{
        e.preventDefault()
        setRegisterForm(true)
    }
    const handleClose=()=>{
        setRegisterForm(false)
    }
    const handleErrorMsg=(str)=>{
        console.log('ERROR MESSAGE')
        setErrorMessage(str)
    }

    const handleLogin=(e)=>{
        history.push('/logday')
    }
    return(
        <React.Fragment>
            <div id="login">
                <div className='login_header'>
                    <h1> Day Logger </h1>
                </div>
                <form className='login-content' onSubmit={handleLogin}>
                    <div className ='form-group'>
                        <label htmlFor='login_email'>Email</label>
                        <br/>
                        <input id = 'login_email' type='text' className = 'formEmail' onChange={(e)=>setEmail(e.target.value)}/>
                        <br/>
                        <label htmlFor='login_pass'>Password</label>
                        <br/>
                        <input type='password' id = 'login_pass' className = 'formPassword' onChange={(e)=>setPass(e.target.value)}/>
                    </div>
                    {errorMessage == null? '':
                        <div className='errorMSG' style={{color : 'red'}}>
                            {errorMessage}
                        </div>}
                    <div className = 'loginBtnGroup'>
                        <button className = 'btn_login' style={{color : 'white', backgroundColor:'#0067A3'}} onClick={handleLogin}>
                            Log in
                        </button>
                        <button className = 'btn_createAccount' style={{color : 'white', backgroundColor:'darkgreen'}} onClick={handleOpen}>
                            Create New Account
                        </button>
                    </div>
                </form>
            </div>
            <CreateNewAccount handleLogged={handleLogged} registerForm={registerForm} handleClose={handleClose} handleErrorMsg={handleErrorMsg} handleClose={handleClose} />`
        </React.Fragment>
    );

}


export default Login