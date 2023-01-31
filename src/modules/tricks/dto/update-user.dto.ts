import { PartialType } from '@nestjs/mapped-types';
import { CreateTrickDto } from './create-trick.dto';

export class UpdateUserDto extends PartialType(CreateTrickDto) {}
