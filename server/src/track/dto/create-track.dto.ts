import { ObjectId } from 'mongoose';
export class CreateTrackDto {
  readonly name: string;
  readonly artist: string;
  readonly lyrics: string;
  readonly albumID: ObjectId;
  readonly album: string;
  readonly genre: string;
  readonly userID: string;
}
