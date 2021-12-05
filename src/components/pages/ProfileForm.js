import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {
    getCurrentUser,
    logOutUsersAPIMethod,
    updateUserAPIMethod,
    uploadImageToCloudinaryAPIMethod
} from "../../API/userApi";


function ProfileForm(props){
    const [user, setUser] = useState({...props.user})
    const history = useHistory()
    let formData;
  /*  useEffect(()=>{
        getCurrentUser()
            .then((obj)=>{setUser(obj)})
    },[])*/

    const onChangeInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let updatedUser = {...user}
        if(name === 'location' || name === 'locationDetail'){
            if(name === 'location') {
                updatedUser.locations.location = value;
            }else{
                updatedUser.locations.locationDetail = value;
            }
        }else {
            updatedUser = {...user, [name]: value};
        }
        setUser(updatedUser);
    }
    const removeImg=()=>{
        let updatedUser = {...user, profileImg: 'defaultProfile.png'};
        setUser(updatedUser);
    }
    const handleSave=(event)=>{
        let tmpUser = {...user}
        const loc = tmpUser.locations.location
        const loc2 = tmpUser.locations.locationDetail
        tmpUser={...user,location:loc, locationDetail:loc2}
        updateUserAPIMethod(tmpUser)
            .then((res)=>console.dir(res))
        props.setUser(user)
    }
    const handleLogOut =() =>{
        logOutUsersAPIMethod(user)
            .then((res)=>{
                setUser({})
                console.dir(res)
            })
        history.push('/')
    }

    const handleImageSelected = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            formData = new FormData();

            const unsignedUploadPreset = 'fugjlrit'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                const updatedUser = {...user, "profileImg": response.url};
                setUser(updatedUser);
                console.log("Updating...",updatedUser)
            });
        }
    }
    return(
        <React.Fragment>
            <div id="profile-form" >
                <div className='profile-content'>
                    <div className ='profile-title'>
                        <h2>Edit Profile</h2>
                    </div>
                        <div className = 'profile-photo'>
                            <h3>Profile photo</h3>
                            <div className="photo">
                                <img
                                    className='profile_picture'
                                    src= {!user? 'defaultProfile.png':user.profileImg}
                                    alt='profile'
                                />
                                <label className = 'newImg'>
                                    <input type="file"  name="image" accept="image/*" id="cloudinary" className = 'newImg' style={{width:0+'%'}}onChange={handleImageSelected}/>
                                    Choose New Image
                                </label>
                                <button type="button" className="removeImg" onClick={removeImg} >Remove Image</button>
                            </div>
                        </div>
                        <div className = 'profile-name'>
                            <label id='name'><h3>Name</h3></label>
                            <input className = 'edit-text' type="text" name="name" value = {user? user.name:''} onChange={onChangeInput}/>
                        </div>
                        <div className = 'profile-email'>
                            <label id='email'><h3>Email</h3></label>
                            <input className = 'edit-text' type="text" name="email" value = {user? user.email:''} onChange={onChangeInput}/>
                        </div>
                        <div className = 'profile-location'>
                            <label id='location'><h3>Address</h3></label>
                            <input className = 'edit-text' type="text" name="location" value = {user.locations? user.locations.location:''} onChange={onChangeInput}/>
                            <input className = 'edit-text' type ='text' name ='locationDetail' value = {user.locations? user.locations.locationDetail:''} onChange={onChangeInput}/>
                        </div>
                        <div className="clearfix">
                            <button  type = 'submit' className='save' onClick={handleSave} style={{width:150+'px'}}>
                                Save
                            </button>
                            <button type="button" className="logout" onClick={handleLogOut}>Logout</button>
                        </div>
                </div>
            </div>
        </React.Fragment>
    )

}
export default ProfileForm;