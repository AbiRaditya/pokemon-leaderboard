import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  password: string;

  type: string;

  constructor(partial: Partial<AccountDto>) {
    Object.assign(this, partial);
  }
}
