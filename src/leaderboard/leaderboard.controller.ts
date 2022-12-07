import {
  Body,
  Controller,
  //   Delete,
  Get,
  Logger,
  //   Param,
  Post,
  Headers,
  //   ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { CreateLeaderboardDto } from './dto/leaderboard.dto';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardService } from './leaderboard.service';

import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';
import { IResponseError } from 'src/error-handler/response.error.interface';
const globalExceptionFIlter = new GlobalExceptionFilter();

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}
  @Post()
  async create(
    @Body() createLeaderBoradDto: CreateLeaderboardDto,
    @Headers() headers,
  ): Promise<Leaderboard> {
    try {
      const device_token = headers.device_token;
      Logger.log(createLeaderBoradDto, 'createLeaderBoradDto');
      const response = await this.leaderboardService.create(
        createLeaderBoradDto,
        device_token,
      );
      return response;
    } catch (error) {
      Logger.log(error, 'error 41');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  @Get()
  async findAll(
    @Headers() headers: { device_token: string },
  ): Promise<Leaderboard[]> {
    try {
      const device_token = headers.device_token;

      return await this.leaderboardService.findAll(device_token);
    } catch (error) {
      Logger.log(error, 'error 41');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
