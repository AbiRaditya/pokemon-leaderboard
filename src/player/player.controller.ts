import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Headers,
  Delete,
  // UseInterceptors,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';
import { Logger } from '@nestjs/common';
import { MessageResponse } from 'src/account/dto/response-msg.dto';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { PlayerDto } from './dto/player.dto';
import { decodeHash } from 'src/helpers/StringCrypto';

const globalExceptionFIlter = new GlobalExceptionFilter();

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(
    @Body() createPlayerDto: Player,
  ): Promise<MessageResponse | IResponseError> {
    try {
      const response = await this.playerService.create(createPlayerDto);
      Logger.log(response, 'createPlayer');
      if (!response.player_name) {
        throw response;
      }
      return {
        message: [`Player ${response.player_name} created successfully`],
        status: 201,
      };
    } catch (error) {
      Logger.log(error, 'error PlayerController');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllPlayer(
    @Headers() headers: { device_token: string },
  ): Promise<PlayerDto[] | IResponseError> {
    try {
      const device_token = headers.device_token;
      const decrypted_token = decodeHash(device_token);
      const response = await this.playerService.findAll(decrypted_token);
      // const data = {
      //   data: response[0].map((each) => {
      //     return new PlayerDto(each);
      //   }),
      //   totalItems: response[1],
      // };
      // return data;
      return response;
    } catch (error) {
      Logger.log(error, 'error PlayerController');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  @Put()
  async editPlayer(
    @Body() playerDto: Player,
    @Headers() headers: { device_token: string },
  ): Promise<{ message: string[] }> {
    try {
      const player_name = playerDto.player_name;
      const device_token = headers.device_token;
      const decrypted_token = decodeHash(device_token);
      if (!player_name) {
        throw { message: { message: `player name required` } };
      }
      if (!device_token || !decrypted_token) {
        throw { message: { message: `token not found / tampered` } };
      }
      await this.playerService.edit({
        device_token: decrypted_token,
        player_name,
      });
      return {
        message: [`Player name successfully updated to: ${player_name}`],
      };
    } catch (error) {
      Logger.log(error, 'error PlayerController');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  @Delete()
  async deletePlayer(
    @Body() playerDto: Player,
    @Headers() headers: { device_token: string },
  ): Promise<{ message: string[] }> {
    try {
      const player_name = playerDto.player_name;
      const device_token = headers.device_token;
      const decrypted_token = decodeHash(device_token);
      if (!player_name) {
        throw { message: { message: `player name required` } };
      }
      if (!device_token || !decrypted_token) {
        throw { message: { message: `token not found / tampered` } };
      }

      const player = await this.playerService.findByToken(decrypted_token);
      if (!player) {
        throw { message: { message: `player not found` } };
      }
      if (player.player_name !== player_name) {
        throw { message: { message: `player name delete confirmation error` } };
      }
      await this.playerService.delete(decrypted_token);
      return {
        message: [`player: ${player_name} successfully deleted`],
      };
    } catch (error) {
      Logger.log(error, 'error PlayerController');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
