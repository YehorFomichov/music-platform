import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from '../../models/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from '../file/file.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  @Inject(AlbumService)
  private readonly albumsService: AlbumService;
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, image, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const imagePath = this.fileService.createFile(FileType.IMAGE, image);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      image: imagePath,
    });
    if (dto.albumID) {
      await this.albumsService.addTrackToAlbum(dto.albumID, track._id);
    }
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
