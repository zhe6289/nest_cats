import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
export interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
}
@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findCat(id: any) {
    const dog = this.dogs.find(el => {
      return el.id === id
    })
    if (!dog) {
      throw new HttpException("Cats not found", 404);
    }
    return Promise.resolve(dog)
  }
}