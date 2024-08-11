import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateSpaceshipDto } from './update-spaceship.dto';

export class CreateSpaceshipDto extends UpdateSpaceshipDto{  
  @IsNotEmpty()
  @IsUUID('4')
  "spaceshipId": string;
}