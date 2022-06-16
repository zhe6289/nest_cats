import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../modules/Shared/Guards/roles.guard'
import { Roles } from 'src/modules/Shared/Decorators/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('')
  @Roles('admin')
  async findAll(): Promise<Cat[]> {
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  async findCat( @Response() res, @Param('id') id) {
    console.log(id)
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