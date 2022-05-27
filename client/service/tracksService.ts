import httpService from "./httpService";
const trackEndPoint = "/tracks";

const trackService = {
  getTracks: async (count, offset) => {
    const url = `${trackEndPoint}?count=${count}&offset=${offset}`;
    const { data } = await httpService.get(url);
    return data;
  },
  getTrackById: async (id) => {
    const url = `${trackEndPoint}/${id}`;
    const { data } = await httpService.get(url);
    return data;
  },
  uploadTrack: async (formData) => {
    const { data } = await httpService.post(trackEndPoint, formData);
    return data;
  },
};
export default trackService;
