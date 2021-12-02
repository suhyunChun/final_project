import React, {useState} from "react";
import { useHistory} from "react-router-dom";

function CreatNewAccount(props){
    const [user,setUser] = useState({profileUrl:'defaultProfile.jpg'})
    const history = useHistory();
    const handleSave=(e)=>{
        /*
        post -> add new user
         */
        history.push('/logday')
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
