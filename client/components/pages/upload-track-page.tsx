import React, { useState, useEffect } from "react";
import InputForm from "../common/input-form";
import TextForm from "../common/text-form";
import { validator } from "../../utils/validator";
import FileUpload from "../common/file-upload";
import httpService from "../../service/httpService";
import trackSlice from "../../store/trackSlice";
import trackService from "../../service/tracksService";
import { useRouter } from "next/router";
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

const UploadTrackPage: React.FC<UploadPageProps> = ({ step, onChangeStep }) => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    artist: "",
    lyrics: "",
    image: null,
    audio: null,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    track: {
      isRequired: {
        message: "You need to enter the track name",
      },
    },
    artist: {
      isRequired: {
        message: "You need to enter the track artist",
      },
    },
    lyrics: {
      isRequired: {
        message: "You need to enter lyrics",
      },
    },
    image: {
      isRequired: {
        message: "Please upload your image",
      },
    },
    audio: {
      isRequired: {
        message: "Please upload your audio",
      },
    },
  };
  useEffect(() => {
    // validate();
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
    const formData = new FormData();
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
    });
    trackService.uploadTrack(formData);
    router.push("/tracks");
  };
  if (step === 1) {
    return (
      <div>
        <h3 className="my-4">Track info</h3>
        <InputForm
          label={"Enter track name:"}
          name={"name"}
          type={"text"}
          value={data.name}
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
        <FileUpload setFile={handleChange} accept={"image/*"} name="image">
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
        <FileUpload setFile={handleChange} accept={"audio/*"} name="audio">
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

export default UploadTrackPage;
