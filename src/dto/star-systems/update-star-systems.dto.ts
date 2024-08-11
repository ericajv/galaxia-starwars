import { IsNotEmpty } from 'class-validator';

export class UpdateStarSystemsDto {
  @IsNotEmpty()
  "name": string;
  
  @IsNotEmpty()
  "description": string;
}