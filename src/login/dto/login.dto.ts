import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(partial: Partial<CreateLoginDto>) {
    Object.assign(this, partial);
  }
}
