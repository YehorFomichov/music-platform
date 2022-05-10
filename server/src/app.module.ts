import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://MP-2022:eeETb2nCwFMdg15i@cluster0.cllzv.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
