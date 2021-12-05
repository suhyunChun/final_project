import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import CreateNewAccount from "./CreateNewAccount";
import {logInUsersAPIMethod} from "../API/userApi";
import App from "../App";

function Login(props) {
    const [errorMessage, setErrorMessage] = useState('')
    const [registerForm, setRegisterForm] = useState(false)
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [user,setUser]= useState({})
    const [loginSuccess,setLoginSuccess] = useState(false)
    const history = useHistory();
    const handleOpen=(e)=>{
        e.preventDefault()
        setRegisterForm(true)
    }
    const handleClose=()=>{
        setRegisterForm(false)
    }
    const handleErrorMsg=(str)=>{
        /*needed to add error messages*/
        setErrorMessage(str)
    }

    const handleLogin=(e)=>{
        e.preventDefault()
        console.log(email,pass)
        logInUsersAPIMethod({email:email, password:pass})
            .then(response => response.json())
            .then(res => {
                console.log("RES IS ",res);
                if(res._id != null){
                    //setUser(user)
                    props.setLoginSuccess(true)
                    history.push("/profile");
                }
                else{
                    setErrorMessage("Invalid user or password");
                }
            })
            //.catch(err => alert('Login Error'));
    }

    if(loginSuccess){
        return(
            <App/>
        )
    }else {
        return (
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
                        {errorMessage == null ? '' :
                            <div className='errorMSG' style={{color: 'red'}}>
                                {errorMessage}
                            </div>}
                        <div className='loginBtnGroup'>
                            <button className='btn_login' onClick={handleLogin}>
                                Log in
                            </button>
                            <button className='btn_createAccount' onClick={handleOpen}>
                                Create New Account
                            </button>
                        </div>
                    </form>
                </div>
                <CreateNewAccount registerForm={registerForm} handleClose={handleClose}
                                  handleErrorMsg={handleErrorMsg}/>`
            </React.Fragment>
        );
    }

}


export default Login