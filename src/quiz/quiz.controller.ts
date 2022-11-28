import { Controller, Get, HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { firstValueFrom } from 'rxjs';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import NumberGenerate from 'src/helpers/NumberGenerate';

import { encodeString } from 'src/helpers/StringCrypto';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

const globalExceptionFIlter = new GlobalExceptionFilter();

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly leaderboardService: LeaderboardService,
    private http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getQuizes() {
    try {
      const numbers = NumberGenerate.oneTo1154();
      const pokemonRequests = [];
      // const secretTest = this.configService.get('secret');
      // const secretTest = process.env.secret;
      // Logger.log(secretTest, 'secretTest');
      // const stringCrypt = new StringCrypt().encode('hello');
      // const stringCrypt = encodeString('hello');
      // Logger.log(stringCrypt, 'stringCrypt');

      numbers.forEach((number) => {
        pokemonRequests.push(
          firstValueFrom(
            this.http.get(`https://pokeapi.co/api/v2/pokemon/${number}`),
          ),
        );
      });
      //   Logger.log(pokemonRequests, 'pokemonRequests');
      const pokemonResponses = await Promise.all(pokemonRequests);
      const responseMap = (pokemon) => {
        return {
          id: encodeString(`${pokemon.data.id}`),
          sprites: {
            front_default: encodeString(pokemon.data.sprites.front_default),
            back_default: encodeString(pokemon.data.sprites.back_default),
          },
        };
      };
      // Logger.log(pokemonResponses[0].data, 'pokemonResponses');
      return {
        data: pokemonResponses.map(responseMap),
      };
    } catch (error) {
      Logger.log(error, 'error 59');
      const errorObj = globalExceptionFIlter.catch(error);

      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
