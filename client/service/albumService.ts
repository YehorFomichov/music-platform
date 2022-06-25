import httpService from "./httpService";
const albumEndPoint = "/albums";

const albumService = {
  getAlbums: async () => {
    const url = `${albumEndPoint}`;
    const { data } = await httpService.get(url);
    return data;
  },
  getAlbumById: async (id) => {
    const url = `${albumEndPoint}/${id}`;
    const { data } = await httpService.get(url);
    return data;
  },
  uploadAlbum: async (formData) => {
    const { data } = await httpService.post(albumEndPoint, formData);
    return data;
  },
};
export default albumService;
