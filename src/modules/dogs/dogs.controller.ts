import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from './dogs.service';
export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
export class CreateDogDto {
  id: number;
  name: string;
  age: number;
  breed: string;
}
@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    this.dogsService.create(createDogDto);
  }

  @Get('')
  async findAll(): Promise<Cat[]> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findCat( @Response() res, @Param('id') id) {
    //+id ，+符號可以直接把string 轉換成number
    this.dogsService.findCat(id)
        .then((cats) => {
          res.status(HttpStatus.OK).json(cats);
        })
        .catch((error) => {
          console.error(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }  
}