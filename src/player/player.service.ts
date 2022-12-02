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
    const response = this.playerRepository
      .createQueryBuilder(`player`)
      .select([`player.player_name`])
      .orderBy(`player.player_name`, `ASC`);

    return response.getManyAndCount();
  }
  async findByToken(device_token: string): Promise<Player> {
    if (!device_token) {
      return null;
    }

    const response = this.playerRepository
      .createQueryBuilder(`player`)
      .select([`player.id`, `player.player_name`])
      .where(`player.device_token = :device_token`, { device_token });
    return response.getOne();
  }
}
