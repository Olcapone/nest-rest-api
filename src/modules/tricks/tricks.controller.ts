import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { TricksService } from './tricks.service';
import { CreateTrickDto } from './dto/create-trick.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('tricks')
export class TricksController {
  constructor(private readonly tricksService: TricksService) {}

  @Post()
  create(@Body() createTrickDto: CreateTrickDto) {
    return this.tricksService.create(createTrickDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.tricksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tricksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.tricksService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tricksService.remove(+id);
  }
}
