import React, { useEffect, useState } from "react";
import InputForm from "../../components/common/input-form";
import FileUpload from "../../components/common/file-upload";
import { useRouter } from "next/router";
import albumService from "../../service/albumService";
import styles from "../../styles/upload-album.module.scss";
import SelectField from "../../components/common/selectField";
import ProgressBar from "../../components/ui/progress-bar";
import { ITrackUpload } from "../../types/track";
import tracks from "../tracks";
import TextForm from "../../components/common/text-form";
import FormData from "form-data";
import trackService from "../../service/tracksService";
import localStorageService from "../../service/localStorage.service";

const genreOptions = [
  { name: "Pop", value: "pop" },
  { name: "Rock", value: "rock" },
];
interface AlbumDataInterface {
  name: string;
  artist: string;
  image: null | Blob;
  genre: string;
  tracks: ITrackUpload[];
}

const UploadAlbum = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AlbumDataInterface>({
    name: "",
    artist: "",
    image: null,
    genre: "pop",
    tracks: [],
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const setFileToUpload = (target) => {
    if (!target.value) return;
    const tracksArray =
      data.tracks.length > 0
        ? [
            ...data.tracks,
            {
              artist: "",
              lyrics: "",
              name: target.value.name.substr(
                0,
                target.value.name.lastIndexOf(".")
              ),
              audio: target.value,
              modalOpen: false,
            },
          ]
        : [
            {
              artist: "",
              lyrics: "",
              name: target.value.name.substr(
                0,
                target.value.name.lastIndexOf(".")
              ),
              audio: target.value,
              modalOpen: false,
            },
          ];
    setData((prevState) => ({
      ...prevState,
      [target.name]: tracksArray,
    }));
  };
  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(data).forEach((el) => {
      if (el !== "tracks") {
        formData.append(el, data[el]);
      }
    });
    formData.append("userID", localStorageService.getUserId());
    const album = await albumService.uploadAlbum(formData);
    await Promise.all(
      data.tracks.map(async (track) => {
        const trackFormData = new FormData();
        trackFormData.append("name", track.name);
        trackFormData.append("artist", data.artist);
        trackFormData.append("lyrics", track.lyrics);
        trackFormData.append("albumID", album._id);
        trackFormData.append("album", data.name);
        trackFormData.append("genre", data.genre);
        trackFormData.append("image", data.image);
        trackFormData.append("audio", track.audio);
        trackFormData.append("userID", localStorageService.getUserId());
        return await trackService.uploadTrack(trackFormData);
      })
    );
    await router.push(`/albums/${album._id}`);
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
  const openEditTrackBox = (index: number) => {
    const newTrack = data.tracks[index];
    newTrack.modalOpen = !newTrack.modalOpen;
    const tracks = data.tracks;
    tracks[index] = newTrack;
    setData((prevState) => ({
      ...prevState,
      tracks,
    }));
  };

  const handleEditTrack = (index: number, target) => {
    const updatedTrack = data.tracks[index];
    updatedTrack[target.name] = target.value;
    const updatedTracks = data.tracks;
    data.tracks[index] = updatedTrack;
    setData((prevState) => ({ ...prevState, tracks: updatedTracks }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{step === 1 && <b>Step 1: Enter album details</b>}</h1>
        <h1>{step === 2 && <b>Step 2: Add music</b>}</h1>
        <h1>{step === 3 && <b>Step 3: Finish</b>}</h1>
        <ProgressBar step={step} />
      </header>
      {step === 1 && (
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
                defaultOption={"Select genre"}
                value={data.genre}
              />
            </div>
          </section>
          <div className={styles.buttons_container}>
            <button className={styles.next_btn} onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className={styles.form_container}>
          <section>
            <div className={styles.upload_box}>
              <div>
                <FileUpload
                  setFile={setFileToUpload}
                  accept={"audio/*"}
                  name={"tracks"}
                >
                  <button>
                    <i className="bi bi-file-earmark-plus mx-2"></i>Upload file
                  </button>
                </FileUpload>
              </div>
              {data.tracks?.length > 0 &&
                data.tracks.map((track, index) => (
                  <p className="mx-3" key={index}>
                    {track.name} has been added
                  </p>
                ))}
              <p style={{ color: "rgb(178 178 178 / 61%)", fontSize: "1rem" }}>
                Uploading constitutes your acceptance of our Terms of Service
                and Privacy Policy. Uploading music is reserved for Artists,
                DJs, and Labels. We are not storing or sharing your personal
                music collection or files. DO NOT upload any content which
                infringes on the rights of 3rd parties.
              </p>
            </div>
          </section>
          <div
            className={styles.buttons_container}
            style={{ justifyContent: "space-around" }}
          >
            <button className={styles.next_btn} onClick={() => setStep(1)}>
              Go back
            </button>
            <button className={styles.next_btn} onClick={() => setStep(3)}>
              Continue
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.form_container}>
          <section className={styles.section_container}>
            <div className={styles.track_container}>
              <h2>Album track list</h2>
              <ul>
                <li className={styles.track_header}>
                  <div>#</div>
                  <div>Song Name</div>
                  <div>Actions</div>
                </li>
                {data.tracks.length > 0 &&
                  data.tracks.map((track, index) => (
                    <>
                      <li
                        className={styles.track_element}
                        key={track.name + index}
                      >
                        <div>{index + 1}</div>
                        <div>{track.name}</div>
                        <div>
                          <i
                            className="bi bi-gear-fill"
                            onClick={() => openEditTrackBox(index)}
                          ></i>
                        </div>
                      </li>
                      {track.modalOpen && (
                        <div className={styles.track_edit}>
                          <div className={styles.track_edit_header}>
                            Basic Information
                          </div>
                          <InputForm
                            label={"Title:"}
                            name={"name"}
                            type={"text"}
                            value={track.name}
                            onChange={(e) => handleEditTrack(index, e)}
                            error={null}
                          />
                          <TextForm
                            label={"Lyrics"}
                            name={"lyrics"}
                            value={track.lyrics}
                            onChange={(e) => handleEditTrack(index, e)}
                          />
                        </div>
                      )}
                    </>
                  ))}
              </ul>
            </div>
          </section>
          <div
            className={styles.buttons_container}
            style={{ justifyContent: "space-around" }}
          >
            <button className={styles.next_btn} onClick={() => setStep(2)}>
              Go back
            </button>
            <button className={styles.next_btn} onClick={handleUpload}>
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAlbum;
