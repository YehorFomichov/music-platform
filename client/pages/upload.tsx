import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/upload.module.scss";
import ProgressBar from "../components/ui/progress-bar";
interface FormDataInterface {
  type: "album" | "track";
}
const UploadTrack = () => {
  const [data, setData] = useState<FormDataInterface>({
    type: "track",
  });
  const handleChangeType = (type: FormDataInterface["type"]): void => {
    setData((prevState) => {
      return { ...prevState, type };
    });
  };
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Please select your upload type:</h1>
      </div>
      <div className={styles.upload_type_container}>
        <div
          className={
            data.type === "album"
              ? styles.upload_type_select_checked
              : styles.upload_type_select
          }
          onClick={() => handleChangeType("album")}
        >
          <input type="radio" id="album" name="fav_language" />
          {data.type === "album" && <i className="bi bi-check2-circle h2"></i>}
          <label htmlFor="album">
            <div className={styles.select_label}>
              <img src="http://localhost:3000/album.png" />
            </div>
            <h2 className={styles.select_label_text}>Album/EP</h2>
          </label>
        </div>
        <div
          className={
            data.type === "track"
              ? styles.upload_type_select_checked
              : styles.upload_type_select
          }
          onClick={() => handleChangeType("track")}
        >
          <input type="radio" id="track" />
          {data.type === "track" && (
            <i className="bi bi-check2-circle h2 m-0 p-0"></i>
          )}
          <label htmlFor="track">
            <div className={styles.select_label}>
              <img src="http://localhost:3000/track.png" />
            </div>
            <h2 className={styles.select_label_text}>Song</h2>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadTrack;
