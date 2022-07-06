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
    const reg = new RegExp(id, 'i')
    const cat =  this.cats.find({ breed: reg })
    if (!cat) {
      throw new HttpException("Cats not found", 404);
    }
    return cat
  }

  async findCatByBreed(body) {
    if (!body.breed) throw new HttpException("Wrong parameter", 404);
    let data = {}
    const reg = new RegExp(body.breed, 'i')
    try {
      const resp =  await this.cats.find({ breed: reg })
      data['status'] = 0
      if (resp && resp.length > 0) {
        data['data'] = resp
        data['message'] = 'Find successful'
      } else {
        data['message'] = 'Cat not found'
      }      
      data['status'] = 0
    } catch (error) {
      data['status'] = 1
      data['message'] = error
    }
    return data
  }

  async removeCat(body) {
    if (!body.id) throw new HttpException("Wrong parameter", 404);
    let data = {}
    try {
      const resp = await this.cats.findByIdAndRemove({ _id: body.id })
      data['status'] = 0
      if (resp) {
        data['message'] = 'Remove successful'
      } else {
        data['message'] = 'Failed to remove, id not found'
      }
    } catch (error) {
      data['status'] = 1
      data['message'] = error
    }
    return data
  }
}
