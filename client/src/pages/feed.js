import React from "react";
 
const Feed = () => {
    const {backendData, errorMessage} = useFetchData("/posts");

    return (
        <div>
            <h1>
                Posts & stuff...
            </h1>

            <Feed backendData={backendData} />
        </div>
    );
};
 
export default Feed;