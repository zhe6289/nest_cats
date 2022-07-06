import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DatabaseModule } from '../Shared/MongoDB/mongo.module';
import { catsProviders } from './cat.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
  exports: [CatsService]
})
export class CatsModule {}