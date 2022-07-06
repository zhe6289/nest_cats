import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindCatDto {
  @ApiProperty()
  @IsString()
  breed: string;
}