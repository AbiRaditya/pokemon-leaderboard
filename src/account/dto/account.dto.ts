import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class AccountDto {
  //   id: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  type: string;
}
