import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Album } from './album.schema';
export type GenresDocument = Genres & Document;
@Schema()
export class Genres {
  @Prop()
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  albums: Album[];
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
