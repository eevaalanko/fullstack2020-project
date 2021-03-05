import React from "react";
import dayjs from "dayjs";

const CompletedChallengeComponent = ({ challenge }) => {
    return (
    <div>
      <p>
        You finished the challenge{" "}
        {dayjs(challenge.endDate).format("DD.MM.YYYY")}!
      </p>
      Results:{challenge.entries.length} days done.
    </div>
  );
};

export default CompletedChallengeComponent;
