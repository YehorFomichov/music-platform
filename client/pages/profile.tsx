import React, { useEffect, useState } from "react";
import styles from "../styles/profile.module.scss";
import albumService from "../service/albumService";
import localStorageService from "../service/localStorage.service";
import { useUserActions } from "../hooks/useUserActions";
import { useRouter } from "next/router";
const Profile = () => {
  const [albums, setAlbums] = useState(null);
  const ID = localStorageService.getUserId();
  const { logOut } = useUserActions();
  const router = useRouter();
  const loadAlbums = async () => {
    const data = await albumService.getAlbums();
    const albums = data.filter((el) => el.userID === ID);
    return albums;
  };
  const handleLogOut = async () => {
    await logOut();
    await localStorageService.removeAuthData();
    await router.push("/");
  };
  useEffect(() => {
    const data = loadAlbums().then((data) => setAlbums(data));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.user_greeting}>
        Hello user {ID}
        <button className={styles.logout} onClick={handleLogOut}>
          <span>Logout</span>
        </button>
      </div>
      <section className={styles.section_container}>
        <div className={styles.track_container}>
          <h2>Your albums:</h2>
          <ul>
            <li className={styles.track_header}>
              <div>#</div>
              <div>Album Name</div>
              <div>Actions</div>
            </li>
            {albums?.length > 0 &&
              albums.map((album, index) => (
                <>
                  <li className={styles.track_element} key={album._id}>
                    <div>{index + 1}</div>
                    <div>
                      {album.artist} - {album.name}
                    </div>
                    <div>
                      <i className="bi bi-gear-fill"></i>
                    </div>
                  </li>
                </>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;
