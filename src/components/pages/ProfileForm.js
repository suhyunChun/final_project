import React, {useState,useEffect } from "react";
import Nav from './Nav'

function ProfileForm(){
    return(
        <React.Fragment>
            <Nav/>
            <div id="profile-form" >
                <form className='profile-content'>
                    <div className="profile-container">
                        <h1>Edit Profile
                            <button type="button" className="cancle-btn" >
                                <span title="Close Modal"> &times;</span>
                            </button>
                        </h1>
                        <div className="photo">
                            <img
                                className='profile'
                                src= 'defaultProfile.png'
                                alt='profile'/>
                            <label className = 'newImg'>
                                <input type="file"  name="image" accept="image/*" id="cloudinary" className = 'newImg'/>
                                Choose New Image

                            </label>
                            <button type="button" className="removeImg" >Remove Image</button>
                        </div>
                        <label id='name'>Name</label>
                        <input type="text" name="name"/>
                        <label id='email'>Email</label>
                        <input type="text" name="email"/>
                        <label id='location'>Location</label>
                        <input type="text" name="location" />
                        <div className="clearfix">
                            <button  type = 'submit' className='save'>
                                Save
                            </button>
                            <button type="button" className="logout">logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )

}
export default ProfileForm;