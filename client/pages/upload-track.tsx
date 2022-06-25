import React, { useState } from "react";
import ProgressBar from "../components/ui/progress-bar";
import UploadTrackPage from "../components/pages/upload-track-page";

const UploadTrack = () => {
  const [step, setStep] = useState(1);
  const handleChangeStep = (action: string): void => {
    if (action === "previous") {
      setStep((prevState) => prevState - 1);
    }
    if (action === "next") {
      setStep((prevState) => prevState + 1);
    }
    if (action === "finish") {
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 shadow p-4 w-100">
          <ProgressBar step={step} />
          <UploadTrackPage step={step} onChangeStep={handleChangeStep} />
        </div>
      </div>
    </div>
  );
};

export default UploadTrack;
