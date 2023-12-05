import React, { useState } from 'react';
import Draggable from 'react-draggable';

const ProfileContainer = ({disabled, scale, component, defaultPosition, index, parentCallback}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <Draggable style={{border:'2px solid blue'}} defaultPosition={defaultPosition} scale={scale} disabled={disabled} onDrag={(e, data) => trackPos(data)} onStop={(e,data)=>{parentCallback(index,data)}} >
            <div className="box">
                {component? component: <h1> Profile component goes here </h1>}
                {/* <div>
                    x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                </div> */}
            </div>
        </Draggable>
    );
};


export default ProfileContainer;