import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Album, AlbumDocument } from '../../models/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from '../file/file.service';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class AlbumService {
  @Inject(GenresService)
  private readonly genresService: GenresService;
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateAlbumDto, image): Promise<Album | void> {
    const imagePath = this.fileService.createFile(FileType.IMAGE, image);
    const album = await this.albumModel.create({
      ...dto,
      image: imagePath,
    });
    await this.genresService.addAlbumToGenre(dto.genre, album.id);
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album._id;
  }
  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return albums;
  }
  async addTrackToAlbum(id: ObjectId, trackId): Promise<Album> {
    const album = await this.albumModel.findById(id);
    album.tracks.push(trackId);
    await album.save();
    return album;
  }
}
