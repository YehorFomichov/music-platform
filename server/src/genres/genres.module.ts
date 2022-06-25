import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from '../file/file.service';
import { Album, AlbumSchema } from '../../models/album.schema';
import { Genres, GenresSchema } from '../../models/genres.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Genres.name, schema: GenresSchema },
    ]),
  ],
  controllers: [GenresController],
  providers: [GenresService, FileService],
  exports: [GenresService],
})
export class GenresModule {}
