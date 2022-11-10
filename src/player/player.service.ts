import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDto } from './dto/player.dto';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  async create(playerDto: { device_token: string; player_name: string }) {
    try {
      const player = new Player();
      player.device_token = playerDto.device_token;
      player.player_name = playerDto.player_name;
      const { player_name } = await this.playerRepository.save(player);
      return {
        player_name,
      };
    } catch (error) {
      console.log(error, 'create player error');
      return error;
    }
  }

  async findAll(): Promise<[Player[], number]> {
    return await this.playerRepository.findAndCount();
  }
}
