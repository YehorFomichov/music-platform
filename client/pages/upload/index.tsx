import React, { useState } from "react";
import styles from "../../styles/upload.module.scss";
import { useRouter } from "next/router";
interface FormDataInterface {
  type: "album" | "track";
}
const Upload = () => {
  const history = useRouter();
  const [typeOfUpload, setTypeOfUpload] = useState<FormDataInterface>({
    type: "track",
  });
  const handleChangeUploadType = (type: FormDataInterface["type"]): void => {
    setTypeOfUpload((prevState) => {
      return { ...prevState, type };
    });
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Please select your upload type:</h1>
      </header>
      <main className={styles.upload_type_container}>
        <div
          className={
            typeOfUpload.type === "album"
              ? styles.upload_type_select_checked
              : styles.upload_type_select
          }
          onClick={() => handleChangeUploadType("album")}
        >
          <input type="radio" id="album" name="fav_language" />
          {typeOfUpload.type === "album" && (
            <i className="bi bi-check2-circle h2"></i>
          )}
          <label htmlFor="album">
            <div className={styles.select_label}>
              <img src="http://localhost:3000/album.png" />
            </div>
            <h2 className={styles.select_label_text}>Album/EP</h2>
          </label>
        </div>
        <div
          className={
            typeOfUpload.type === "track"
              ? styles.upload_type_select_checked
              : styles.upload_type_select
          }
          onClick={() => handleChangeUploadType("track")}
        >
          <input type="radio" id="track" />
          {typeOfUpload.type === "track" && (
            <i className="bi bi-check2-circle h2 m-0 p-0"></i>
          )}
          <label htmlFor="track">
            <div className={styles.select_label}>
              <img src="http://localhost:3000/track.png" />
            </div>
            <h2 className={styles.select_label_text}>Song</h2>
          </label>
        </div>
      </main>
      <footer className={styles.button_container}>
        <button
          className={styles.next_button}
          onClick={() => history.push(`/upload/${typeOfUpload.type}`)}
        >
          Next step
        </button>
      </footer>
      <div className={styles.info_container}>
        <h4>Supported file types:</h4>
        <h6>*.MP3, *.JPG</h6>
      </div>
    </div>
  );
};

export default Upload;
