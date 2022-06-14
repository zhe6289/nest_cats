import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.modules';

@Module({
  imports: [CatsModule, DogsModule],
})
export class AppModule {}