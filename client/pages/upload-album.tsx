import React, { useEffect, useState } from "react";
import InputForm from "../components/common/input-form";
import FileUpload from "../components/common/file-upload";
import { useRouter } from "next/router";
import albumService from "../service/albumService";
import styles from "../styles/upload-album.module.scss";
import SelectField from "../components/common/selectField";
import ProgressBar from "../components/ui/progress-bar";
const genreOptions = [
  { name: "Pop", value: "pop" },
  { name: "Rock", value: "rock" },
];

const UploadTrack = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    artist: "",
    image: null,
    genre: null,
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
    });
    const res = await albumService.uploadAlbum(formData);
    console.log(res);
    router.push("/upload-track");
  };
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!data.image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(data.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [data.image]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          Step 1: <b>Upload Album/EP</b>
        </h1>
      </div>
      <ProgressBar step={1} />
      <div className={styles.form_container}>
        <FileUpload
          setFile={handleChange}
          accept={"image/*"}
          name="image"
          className={styles.image_container}
        >
          {data.image ? (
            <img alt="Image" src={preview} draggable={"false"} />
          ) : (
            <p>Upload Image</p>
          )}
        </FileUpload>
        <div className={styles.inputs}>
          <InputForm
            label={"Album title"}
            type={"text"}
            name={"name"}
            value={data.name}
            onChange={handleChange}
            error={null}
          />
          <InputForm
            label={"Artist"}
            type={"text"}
            name={"artist"}
            value={data.artist}
            onChange={handleChange}
            error={null}
          />
          <SelectField
            label={"Select genre"}
            name={"genre"}
            onChange={handleChange}
            options={genreOptions}
            defaultOption={genreOptions[0].name}
            value={data.genre}
          />
        </div>
      </div>
      <div className={styles.buttons_container}>
        <button className={styles.next_btn} onClick={handleUpload}>
          Upload album and continue
        </button>
      </div>
    </div>
  );
};

export default UploadTrack;
