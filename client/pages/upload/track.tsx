import React, { useEffect, useState } from "react";
import InputForm from "../../components/common/input-form";
import FileUpload from "../../components/common/file-upload";
import { useRouter } from "next/router";
import styles from "../../styles/upload-album.module.scss";
import SelectField from "../../components/common/selectField";
import TextForm from "../../components/common/text-form";
import trackService from "../../service/tracksService";
const genreOptions = [
  { name: "Pop", value: "pop" },
  { name: "Rock", value: "rock" },
];

const Track = () => {
  const router = useRouter();
  const [showLyricsInput, setShowLyricsInput] = useState(false);
  const [data, setData] = useState({
    name: "",
    artist: "",
    image: null,
    audio: null,
    genre: "pop",
    lyrics: "",
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!data.image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(data.image);
    setPreview(objectUrl);
    return () => {
      setData({
        name: "",
        artist: "",
        image: null,
        audio: null,
        genre: "pop",
        lyrics: "",
      });
      URL.revokeObjectURL(objectUrl);
    };
  }, [data.image]);
  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
    });
    try {
      await trackService.uploadTrack(formData);
      await router.push("/tracks");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <b>Upload Your Music!</b>
        </h1>
      </header>
      <div className={styles.form_container}>
        <section className={styles.section_container}>
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
              label={"Title:"}
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
            <SelectField
              label={"Select genre"}
              name={"genre"}
              onChange={handleChange}
              options={genreOptions}
              defaultOption={"Select genre"}
              value={data.genre}
            />
          </div>
        </section>
        <div>
          {data.audio ? (
            <p className="mx-3">{data.audio?.name} has been uploaded</p>
          ) : (
            <FileUpload
              setFile={handleChange}
              accept={"audio/*"}
              name="audio"
              className="d-inline"
            >
              <button className={styles.lyrics_btn}>Upload audio</button>
            </FileUpload>
          )}
          {showLyricsInput ? (
            <TextForm
              label={"Lyrics"}
              name={"lyrics"}
              value={data.lyrics}
              onChange={handleChange}
            />
          ) : (
            <button
              className={styles.lyrics_btn}
              onClick={() => setShowLyricsInput(true)}
            >
              Add lyrics
            </button>
          )}
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.next_btn} onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Track;
