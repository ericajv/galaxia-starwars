import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdatePlanetDto } from './update-planet.dto';

export class CreatePlanetDto extends UpdatePlanetDto {  
  @IsNotEmpty()
  @IsUUID('4')
  "starSystemId": string;
}