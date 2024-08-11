import { IsNotEmpty } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {  
  @IsNotEmpty()
  "name": string;
}