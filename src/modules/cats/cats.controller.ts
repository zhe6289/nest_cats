import { Controller, Get, Post, Body, Param, Response, ParseIntPipe, HttpException, HttpStatus, ValidationPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindCatDto } from './dto/find-cat.dto';
import { CatsService } from './cats.service';
import { RolesGuard } from '../Shared/Guards/roles.guard'
import { Roles } from '../Shared/Decorators/roles.decorator';
import { LoggingInterceptor } from '../Shared/Interceptors/exception.interceptors';
import { ApiTags, ApiResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateCatDto,
  })
  @ApiResponse({ status: 400, description: '缺少參數或參數格式錯誤'})
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('')
  @Roles('admin', 'general')
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'general')
  async findCat( @Response() res, @Param('id') id) {
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

  @Post('/findCat')
  @Roles('admin', 'general')
  async findCatPost(@Body() body: FindCatDto) {
    return await this.catsService.findCatByBreed(body);
  }

  @Post('/removeCat')
  @Roles('admin')
  async removeCat(@Body(new ValidationPipe()) body: string) {
    return await this.catsService.removeCat(body)
  }
}