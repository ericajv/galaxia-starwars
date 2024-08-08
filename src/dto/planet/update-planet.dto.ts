import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlanetDto {
  @IsNotEmpty()
  "name": string;
  
  @IsNotEmpty()
  "climate": string;
  
  @IsNotEmpty()
  @IsNumber()
  "ground": number;
  
  @IsNotEmpty()
  @IsInt()
  "population": number;
}