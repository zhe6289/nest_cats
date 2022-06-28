import { HttpException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { v4 as uuidv4 } from 'uuid';

import { Model } from 'mongoose';
import { catchError } from 'rxjs';

@Injectable()
export class CatsService {
  // private readonly cats: Cat[] = []
  constructor(
    @Inject('CAT_MODEL')
    private readonly cats: Model<Cat>,
  ) {}

  async create(cat: Cat) {
    // Object.assign(cat, {id: uuidv4()});
    // this.cats.push(cat);
    const createdCat = new this.cats(cat);

    return createdCat.save()
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.cats.find();

    return cats
  }

  async findCat(id: string) {
    const keyword = id
    const reg = new RegExp(keyword, 'i')
    const cat =  this.cats.find({ breed: reg })
    if (!cat) {
      throw new HttpException("Cats not found", 404);
    }
    return cat
  }
}
