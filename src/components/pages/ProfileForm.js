import React, {useState,useEffect } from "react";
import {useHistory} from 'react-router-dom'
import Nav from './Nav'

function ProfileForm(props){
    const [user, setUser] = useState(props.user||{})
    const history = useHistory()

    const onChangeInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedUser= {...user, [name]: value};
        setUser(updatedUser);
    }
    const removeImg=()=>{
        let updatedUser = {...user, profileUrl: 'defaultProfile.jpg'};
        setUser(updatedUser);
    }
    const handleSave=(event)=>{
        console.log(user)
        props.setUser(user)
    }
    const handleLogOut =() =>{
        history.push('/')
    }

    const handleImageSelected = (event) => {
        console.log("New File Selected");
    }
    /*
    need to add (upload new image)
     */

    return(
        <React.Fragment>
            <div id="profile-form" >
                <form className='profile-content'>
                    <div className="profile-container">
                        <h2>Edit Profile</h2>
                        <div className = 'Profile-photo'>
                            <h3>Profile photo</h3>
                            <div className="photo">
                                <img
                                    className='profile_picture'
                                    src= {user.profileImg||'defaultProfile.png'}
                                    alt='profile'
                                />
                                <label className = 'newImg'>
                                    <input type="file"  name="image" accept="image/*" id="cloudinary" className = 'newImg' onChange={handleImageSelected}/>
                                    Choose New Image
                                </label>
                                <button type="button" className="removeImg" onClick={removeImg} >Remove Image</button>
                            </div>
                        </div>
                        <div className = 'profile-name'>
                            <label id='name'><h3>Name</h3></label>
                            <input type="text" name="name" value = {user.name||''} onChange={onChangeInput}/>
                        </div>
                        <div className = 'profile-email'>
                            <label id='email'><h3>Email</h3></label>
                            <input type="text" name="email" value = {user.email||''} onChange={onChangeInput}/>
                        </div>
                        <div className = 'profile-location'>
                            <label id='location'><h3>Address</h3></label>
                            <input type="text" name="location" value = {user.location||''} onChange={onChangeInput}/>
                            <input type ='text' name ='location-detail' value = {user.locationDetail||''}onChange={onChangeInput}/>
                        </div>
                        <div className="clearfix">
                            <button  type = 'submit' className='save' onClick={handleSave}>
                                Save
                            </button>
                            <button type="button" className="logout" onClick={handleLogOut}>logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )

}
export default ProfileForm;