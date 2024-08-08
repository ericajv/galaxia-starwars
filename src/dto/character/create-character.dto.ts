import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateCharactertDto } from './update-character.dto';

export class CreateCharactertDto extends UpdateCharactertDto {  
  @IsNotEmpty()
  @IsUUID('4')
  "planetId": string;
}