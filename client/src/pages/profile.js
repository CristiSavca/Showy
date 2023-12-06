import Axios from 'axios';
// import { jsonc } from 'jsonc';
import { parse, stringify} from 'flatted';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../firebase';
import ActivityTracker from '../components/contributions';
import ProfilePic from '../components/profile_picture';
import ProfileContainer from '../components/profile_container';

export default function Profile(currentUser) {
    // State from the second block
    // const currentUser = useAuth();
    console.log('currentUser', currentUser,currentUser.user.uid, currentUser.uid, currentUser.email);
    const [username, setUsername] = useState(null);
    const [isEditing, setisEditing] = useState(false);
    const [customization, setCustomization] = useState([{
        component: <ProfilePic />,
        location: { x: 0, y: 0 }
    },
    {
        component: <ActivityTracker />,
        location: { x: 0, y: 0 }
    },]);
    const [buttonText, setButtonText] = useState('Press me to Enable Editing');
    console.log(currentUser);

    // const componentLocations = getUserCustomizations(currentUser?.uid) //|| "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    async function changeCustomization() {
        let stringCustomizations = [];
        for (let i = 0; i < customization.length; i++) {
            console.log('customization[i]: ', customization[i].component, typeof customization[i].component)
            // stringCustomizations.push(jsonc.stringify(customization[i]));
            console.log('customization[i]', customization[i])
            console.log({
                component: <ActivityTracker />,
                location: { x: 0, y: 0 }
            })
            const item = customization[i];
            console.log('stringify(item): ', stringify(item), typeof stringify(item))
            stringCustomizations.push(stringify(item));

            // stringCustomizations.push(JSON.stringify({
            //     component: <ActivityTracker />,
            //     location: { x: 0, y: 0 }
            // }));
            // Flatted.parse(Flatted.stringify(data))
            // stringCustomizations.push(stringify(customization[i]))
            // console.log("STRINGIFY", stringify(customization[i]))
        }
        await Axios.patch('http://localhost:5000/changeCustomizations', {
            uuid: currentUser.user.uid,
            customizations: stringCustomizations,
        })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    function toggleEditing() {
        // console.log(isEditing, customization)
        setisEditing(!isEditing)
        console.log(isEditing, customization)
        if (!isEditing) {
            setButtonText("Press me to Disable Editing");
            // changeCustomization();
        }
        else {
            setButtonText("Press me to Enable Editing")
            changeCustomization();
        }
        // console.log(isEditing)
    }


    // console.log( 'currentUser',currentUser)
    // Effect from the second block
    useEffect(() => {
        console.log("ID: ", currentUser?.uid)
        async function getUsername() {
            await Axios.get("http://localhost:5000/getUsername", {
                params: {
                    uid: currentUser.user.uid,
                }
            }).then((response) => {
                setUsername(response.data);
                console.log("Name: ", response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        async function getCustomization() {
            await Axios.get("http://localhost:5000/getCustomizations", {
                params: {
                    uid: currentUser.user.uid
                }
            }).then((response) => {
                //parse the array back to objects from strings
                if(response.data){
                    console.log(true, response.data)
                    let parsed_array = [];
                    for (let i = 0; i < response.data.length; i++) {
                        // parsed_array.push(jsonc.parse(response.data[i]));
                        parsed_array.push(parse(response.data[i]));
                    }
                    setCustomization(parsed_array);
                }else{
                    setCustomization([{
                        component: <ProfilePic />,
                        location: { x: 0, y: 0 }
                    },
                    {
                        component: <ActivityTracker />,
                        location: { x: 0, y: 0 }
                    },])
                }
                // let parsed_array = [];
                // for (let i = 0; i < response.data.length; i++) {
                //     // parsed_array.push(jsonc.parse(response.data[i]));
                //     parsed_array.push(parse(response.data[i]));
                // }
                
                // setCustomization(parsed_array);
                console.log("customizations: ", response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        if(currentUser.user.uid){
            getUsername();
            getCustomization();
        }

        
    }, [currentUser]);

    let example_data = [
        // {component: <h1>{currentUser.email}'s Account</h1>, 
        // location:   {x: 0, y: 0}}, 
        {
            component: 'ProfilePic',
            location: { x: 0, y: 0 }
        },
        {
            component: 'ActivityTracker',
            location: { x: 0, y: 0 }
        },
    ]
    const setLocation = (index, new_location) => {
        // delete bottom two lines after connect to DB
        // example_data[index].location.x = new_location.lastX;
        // example_data[index].location.y = new_location.lastY;

        // keep below
        let data = customization;
        data[index].location.x = new_location.lastX;
        data[index].location.y = new_location.lastY;

        setCustomization(data)
        // console.log(example_data);
    }
    return (
        <div>
            <h1>Profile Page</h1>
            {/* Picture Upload */}

            {/* Contribution Graph */}
            {currentUser?.email ? <h1> {username ? username : currentUser.email}'s Account</h1> : null}
            {/* {currentUser?.email ? <h1> {username ? username : currentUser.email}'s Account</h1> : null} */}
            <button onClick={() => toggleEditing()}> {buttonText}</button>
            {/* delete example data line below after connected  */}
            {/* {example_data.map((item, index) => <ProfileContainer parentCallback={setLocation} index={index} disabled={!isEditing} defaultPosition={item.location} component={item.component} />)} */}


            {customization.map((item, index) => <ProfileContainer parentCallback={setLocation} index={index} disabled={!isEditing} defaultPosition={item.location} component={item.component} />)}

            {/* {example_data.map((item, index) => <ProfileContainer parentCallback={setLocation} index={index} disabled={!isEditing} defaultPosition={item.location} component={'Profile'} />)} */}
            {/* <ProfilePic/> */}
            {/* <ActivityTracker /> */}
        </div>
    );
}