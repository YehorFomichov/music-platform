export interface IComment {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  image: string;
  audio: string;
  lyrics: string;
  listens: number;
}
export interface ITrackUpload {
  name: string;
  artist: string;
  audio: File;
  lyrics: string;
  modalOpen: boolean;
}
