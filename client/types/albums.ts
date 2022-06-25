import { ITrack } from "./track";

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  image: string;
  tracks?: ITrack[];
}
