import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    Object.assign(cat, {id: uuidv4()});
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