import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Genres, GenresDocument } from '../../models/genres.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Album } from '../../models/album.schema';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genres.name) private genresModel: Model<GenresDocument>,
  ) {}
  async create(dto: CreateGenreDto): Promise<Genres> {
    return await this.genresModel.create({
      ...dto,
    });
  }
  async getAll(count = 10, offset = 0): Promise<Genres[]> {
    const genres = await this.genresModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return genres;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const genre = await this.genresModel.findByIdAndDelete(id);
    return genre._id;
  }
  public async addAlbumToGenre(
    name: string,
    id: Album,
  ): Promise<Genres | undefined> {
    const genre = await this.genresModel.findOne({ name: name });
    genre.albums.push(id);
    await genre.save();
    return genre;
  }
}
