import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateStarSystemsDto } from './update-star-systems.dto';

export class CreateStarSystemtDto extends UpdateStarSystemsDto {  
  @IsNotEmpty()
  @IsUUID('4')
  "starSystemId": string;
}