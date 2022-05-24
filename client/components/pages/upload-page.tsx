import React, { useState, useEffect } from "react";
import InputForm from "../common/input-form";
import TextForm from "../common/text-form";
import { validator } from "../../utils/validator";
import FileUpload from "../common/file-upload";
interface UploadPageProps {
  step: number;
  onChangeStep: (action: string) => void;
}
interface DataInterfaceElement {
  name: string;
  value: string;
}
interface DataInterface {
  songName: DataInterfaceElement;
  artist: DataInterfaceElement;
}

const UploadPage: React.FC<UploadPageProps> = ({ step, onChangeStep }) => {
  const [data, setData] = useState({
    track: "",
    artist: "",
    lyrics: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleGoBack = () => {
    onChangeStep("previous");
  };
  const handleGoForward = () => {
    onChangeStep("next");
  };
  const handleFinish = () => {
    onChangeStep("finish");
    console.log(data);
  };
  if (step === 1) {
    return (
      <div>
        <h3 className="my-4">Track info</h3>
        <InputForm
          label={"Enter track name:"}
          name={"track"}
          type={"text"}
          value={data.track}
          onChange={handleChange}
          error={null}
        />
        <InputForm
          label={"Artist"}
          name={"artist"}
          type={"text"}
          value={data.artist}
          onChange={handleChange}
          error={null}
        />
        <TextForm
          label={"Lyrics"}
          name={"lyrics"}
          value={data.lyrics}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-dark" disabled>
            Previous step
          </button>
          <button className="btn btn-outline-dark" onClick={handleGoForward}>
            Next step
          </button>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div>
        <h3 className="my-4">Track cover</h3>
        <FileUpload setFile={() => {}} accept={"image/*"}>
          <button className="btn btn-outline-dark mb-5">Upload cover</button>
        </FileUpload>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-dark" onClick={handleGoBack}>
            Previous step
          </button>
          <button className="btn btn-outline-dark" onClick={handleGoForward}>
            Next step
          </button>
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div>
        <h3 className="my-4">Track audio</h3>
        <FileUpload setFile={() => {}} accept={"audio/*"}>
          <button className="btn btn-outline-dark mb-5">Upload audio</button>
        </FileUpload>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-dark" onClick={handleGoBack}>
            Previous step
          </button>
          <button className="btn btn-outline-dark" onClick={handleFinish}>
            Upload track
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default UploadPage;
