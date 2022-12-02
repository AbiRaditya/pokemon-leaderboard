import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  player_name: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  device_token: string;

  constructor(partial: Partial<PlayerDto>) {
    Object.assign(this, partial);
  }
}
