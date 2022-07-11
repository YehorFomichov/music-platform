import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TrackDocument = Track & Document;
@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  lyrics: string;

  @Prop()
  listens: number;

  @Prop()
  image: string;

  @Prop()
  audio: string;

  @Prop()
  genre: string;

  @Prop()
  userID: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
