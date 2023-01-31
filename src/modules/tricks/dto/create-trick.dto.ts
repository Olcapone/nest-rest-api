import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator'
import { TrickConfig } from './trick-config.dto'

export class CreateTrickDto {
    @IsString()
    @IsNotEmpty()
    uuid: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    level: string;
    
    @IsNotEmpty()
    config: TrickConfig;
}
