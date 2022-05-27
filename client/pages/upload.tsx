import React, { useState } from "react";
import ProgressBar from "../components/ui/progress-bar";
import UploadPage from "../components/pages/upload-page";

const Upload = () => {
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
          <UploadPage step={step} onChangeStep={handleChangeStep} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
