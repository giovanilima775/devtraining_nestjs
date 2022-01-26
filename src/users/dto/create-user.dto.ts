import { IsNotEmpty, Matches, IsString, IsEmail } from 'class-validator';
import { MessageHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.PASSWORD_INVALID,
  })
  password: string;
}
