import { ObjectId } from 'mongoose';
export class CreateTrackDto {
  readonly name: string;
  readonly artist: string;
  readonly lyrics: string;
  readonly album: ObjectId;
}
