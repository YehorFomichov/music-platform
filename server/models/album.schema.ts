import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type AlbumDocument = Album & Document;
@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  tracks: Album[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
