import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('')
  async findAll(): Promise<Cat[]> {
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }

  @Get(':id')
  findCat( @Response() res, @Param('id') id) {
    //+id ，+符號可以直接把string 轉換成number
    this.catsService.findCat(id)
        .then((cats) => {
          res.status(HttpStatus.OK).json(cats);
        })
        .catch((error) => {
          console.error(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }  
}