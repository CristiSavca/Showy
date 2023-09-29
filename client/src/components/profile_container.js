import React, { useState } from 'react';
import Draggable from 'react-draggable';

const ProfileContainer = () => {
    // let order = [ <h1>first.</h1> , <h1>second.</h1>, <h1>third.</h1>]
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <Draggable onDrag={(e, data) => trackPos(data)}>
            <div className="box">
                <h1>Profile loading...</h1>
                <div>
                    x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                </div>
            </div>
        </Draggable>





    );
};




export default ProfileContainer;