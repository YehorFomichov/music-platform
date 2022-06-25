import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/genres')
export class GenresController {
  constructor(private genresService: GenresService) {}
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  create(@Body() dto: CreateGenreDto) {
    return this.genresService.create(dto);
  }
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.genresService.getAll(count, offset);
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.genresService.delete(id);
  }
}
