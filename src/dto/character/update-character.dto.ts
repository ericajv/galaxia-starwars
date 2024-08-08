import { IsNotEmpty} from 'class-validator';

export class UpdateCharactertDto {
  @IsNotEmpty()
  "name": string;
  
  @IsNotEmpty()
  "race": string;
  
  @IsNotEmpty()
  "affiliation": string;
  
}