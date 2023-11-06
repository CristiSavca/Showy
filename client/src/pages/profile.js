import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ProfileContainer from '../components/profile_container';

const Profile = () => {
    const [isEditing, setisEditing] = useState(false);
    const [buttonText, setButtonText] = useState('Press me to Enable Editing');

    console.log(isEditing)
    function toggleEditing(){
        setisEditing(!isEditing)
        if(!isEditing) setButtonText("Press me to Disable Editing")
        else setButtonText("Press me to Enable Editing")
        console.log(isEditing)
    }

    return (
        <>
            <h1>Name here</h1>
            <button onClick={()=> toggleEditing()}> {buttonText}</button>
            <ProfileContainer disabled={!isEditing} scale={1} component={<h2>This is my description, I am a coder! </h2>}> 
                
            </ProfileContainer>
            <ProfileContainer disabled={!isEditing} scale={1}/>
            <ProfileContainer disabled={!isEditing} scale={1}/>
        </>
    );
};
 
export default Profile;