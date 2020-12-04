import React from "react";

const ChallengeComponent = ({challenge}) => {
    console.log('wheee')
    return (
        <div>
            <h1>{challenge.name}</h1>
        </div>
    )
}

export default ChallengeComponent