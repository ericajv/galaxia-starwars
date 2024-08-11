import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSpaceshipDto {
  @IsNotEmpty()
  "name": string;
  
  @IsNotEmpty()
  "model": string;
  
  @IsNotEmpty()
  "manufacturer": string;
  
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  "capacity": number;
}