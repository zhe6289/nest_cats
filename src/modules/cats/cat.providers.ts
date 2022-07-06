
import { Connection } from 'mongoose';
import { CatSchema } from './schemas/cats.schema';

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('cats', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]