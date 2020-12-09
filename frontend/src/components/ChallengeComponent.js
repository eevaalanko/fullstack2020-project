import React from "react";

const ChallengeComponent = ({ challenge }) => {
  const startChallenge = () => {
    alert("wheee");
  };
  return (
    <div>
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <p>Challenge duration: {challenge.duration} days</p>
      <button onClick={startChallenge}>Start the challenge!</button>
    </div>
  );
};

export default ChallengeComponent;
