import Axios from 'axios';
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
    console.log(currentUser);

    // const componentLocations = getUserCustomizations(currentUser?.uid) //|| "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  
  function toggleEditing(){
        setisEditing(!isEditing)
        if(!isEditing) setButtonText("Press me to Disable Editing")
        else setButtonText("Press me to Enable Editing")
        console.log(isEditing)
    }


    console.log( 'currentUser',currentUser)
    // Effect from the second block
    // useEffect(() => {
    //     // const currentUser = useAuth();
    //     // async function getUserCustomizations() {
    //     //     await Axios.get("http://localhost:5000/getUsername", {
    //     //         params: {
    //     //             uid: currentUsername.uid
    //     //         }
    //     //     }).then((response) => {
    //     //         setUsername(response.data);
    //     //         console.log("hello",response.data);
    //     //     }).catch((error) => {
    //     //         console.log(error);
    //     //     });
    //     // }

    //     getUsername();
    // }, [currentUsername]);

    let example_data = [
        // {component: <h1>{currentUser.email}'s Account</h1>, 
        // location:   {x: 0, y: 0}}, 
        {component: <ProfilePic/>, 
        location:   {x: 0, y: 0}}, 
        {component: <ActivityTracker/>, 
        location:   {x: 0, y: 0}}, 
    ]
    const setLocation = (index, new_location) =>{
        example_data[index].location.x = new_location.lastX;
        example_data[index].location.y = new_location.lastY;
        console.log(example_data);
    }
    return (
        <div>
            <h1>Profile Page</h1>
            {/* Picture Upload */}

            {/* Contribution Graph */}
            {currentUser?.email ? <h1> {currentUser.email}'s Account</h1> : null}
            <button onClick={()=> toggleEditing()}> {buttonText}</button>
            {example_data.map((item, index)=> <ProfileContainer parentCallback={setLocation} index={index}disabled={!isEditing} defaultPosition={item.location} component={item.component}/>)}
            {/* <ProfilePic/> */}
            {/* <ActivityTracker /> */}
        </div>
    );
}