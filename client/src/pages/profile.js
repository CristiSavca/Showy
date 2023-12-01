
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../firebase';
import ActivityTracker from '../components/contributions';
import ProfilePic from '../components/profile_picture';
import ProfileContainer from '../components/profile_container';

export default function Profile() {
    // State from the second block
    const currentUser = useAuth();
     const [isEditing, setisEditing] = useState(false);
    const [buttonText, setButtonText] = useState('Press me to Enable Editing');
  
  
  function toggleEditing(){
        setisEditing(!isEditing)
        if(!isEditing) setButtonText("Press me to Disable Editing")
        else setButtonText("Press me to Enable Editing")
        console.log(isEditing)
    }


    console.log( 'currentUser',currentUser)
    // Effect from the second block
    // useEffect(() => {

    // });
    const example_data = [
        // {component: <h1>{currentUser.email}'s Account</h1>, 
        // location:   {x: 0, y: 0}}, 
        {component: <ProfilePic/>, 
        location:   {x: 0, y: 0}}, 
        {component: <ActivityTracker/>, 
        location:   {x: 0, y: 0}}, 
    ]
    return (
        <div>
            <h1>Profile Page</h1>
            {/* Picture Upload */}

            {/* Contribution Graph */}
            {currentUser?.email ? <h1> {currentUser.email}'s Account</h1> : null}
            <button onClick={()=> toggleEditing()}> {buttonText}</button>
            {example_data.map((item)=> <ProfileContainer disabled={!isEditing} defaultPosition={item.location} component={item.component}/>)}
            {/* <ProfilePic/> */}
            {/* <ActivityTracker /> */}
        </div>
    );
}