import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './modules/Shared/MongoDB/mongo.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'), CatsModule, DogsModule],
  imports: [DatabaseModule, CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}