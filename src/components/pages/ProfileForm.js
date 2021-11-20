import React, {useState,useEffect } from "react";
import Nav from './Nav'

function ProfileForm(){
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
                                    src= 'defaultProfile.png'
                                    alt='profile'
                                />
                                <label className = 'newImg'>
                                    <input type="file"  name="image" accept="image/*" id="cloudinary" className = 'newImg'/>
                                    Choose New Image

                                </label>
                                <button type="button" className="removeImg" >Remove Image</button>
                        </div>
                        </div>
                        <label id='name'><h3>Name</h3></label>
                        <input type="text" name="name"/>

                        <label id='email'><h3>Email</h3></label>
                        <input type="text" name="email"/>
                        <label id='location'><h3>Address</h3></label>
                        <input type="text" name="location" />
                        <input type ='text' name ='location-detail'/>
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