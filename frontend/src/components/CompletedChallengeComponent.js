import React from "react";
import dayjs from "dayjs";

const CompletedChallengeComponent = ({ challenge, duration }) => {
  return (
    <div>
      <p>
        {`Challenge time: ${dayjs(challenge.startDate).format(
          "DD.MM.YYYY"
        )} - ${dayjs(challenge.endDate).format("DD.MM.YYYY")}`}
      </p>
      {challenge.abortDate ? (
        <p>
          {`Challenge was aborted ${dayjs(challenge.abortDate).format(
            "DD.MM.YYYY"
          )}.`}
        </p>
      ) : (
        <p>You finished the challenge!</p>
      )}
      <p>{`Results: ${challenge.entries.length}/${duration} days done`}</p>
    </div>
  );
};

export default CompletedChallengeComponent;
