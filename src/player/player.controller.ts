import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';
import { Logger } from '@nestjs/common';
import { MessageResponse } from 'src/account/dto/response-msg.dto';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { PlayerDto } from './dto/player.dto';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllPlayer(): Promise<
    { data: PlayerDto[]; totalItems: number } | IResponseError
  > {
    try {
      const response = await this.playerService.findAll();
      const data = {
        data: response[0].map((each) => {
          return new PlayerDto(each);
        }),
        totalItems: response[1],
      };
      return data;
      //   return response;
    } catch (error) {
      Logger.log(error, 'error PlayerController');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
