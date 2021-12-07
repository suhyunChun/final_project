import React, {useState} from "react";
import {createUserAPIMethod} from "../API/userApi";


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password){
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return re.test(password)
}

function CreatNewAccount(props){
    const [user,setUser] = useState({profileUrl:'defaultProfile.png'})

    const handleSave=(e)=>{
        if(validatePassword(user.password) && validateEmail(user.email)) {
            createUserAPIMethod(user)
                .then((res) =>
                    e.preventDefault())
                .catch(() =>
                        alert('email duplicated'),
                        props.handleClose(),
                        props.setLoginSuccess(false),
                        e.preventDefault()
                )
        }else{
            if(!validateEmail((user.email))){
                alert("Invalid email")
                props.setLoginSuccess(false)
            }else{
                alert("invalid password")
                props.setLoginSuccess(false)
            }
        }
    }
    const onChangeInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const updatedUser= {...user, [name]: value};
        setUser(updatedUser);
    }

    return(
        <div id="id01" onSubmit={handleSave} onClick={(event)=>(event.target === event.currentTarget? props.handleClose() : null)} className="modal" style={{display : props.registerForm? 'flex' : 'none'}}>
            <form className='modal-content'>
                <div className="container">
                    <h1 id ='header_signup'>Sign up
                        <button type="button" className="canclebtn" onClick={props.handleClose}>
                            <span title="Close Modal" > &times;</span>
                        </button>
                    </h1>
                    <label id='name'>Name</label>
                    <input type="text" name="name" onChange={onChangeInput}/>
                    <label id='email'>Email</label>
                    <input type="text" name="email" onChange={onChangeInput}/>
                    <label id='password'>Password</label>
                    <br/>
                    <input type="password" name="password" style={{width: '100%', height:'30px'}} onChange={onChangeInput}/>
                    <div className="clearfix-signup">
                        <button  type = 'submit' className='signUp' onClick={handleSave}>Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatNewAccount;
