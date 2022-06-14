import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findCat(id: any) {
    const cat = this.cats.find(el => {
      return el.id === id
    })
    if (!cat) {
      throw new HttpException("Cats not found", 404);
    }
    return Promise.resolve(cat)
  }
}