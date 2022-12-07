import {
  Controller,
  Get,
  HttpException,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { firstValueFrom } from 'rxjs';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import NumberGenerate from 'src/helpers/NumberGenerate';

import { encodeString, decodeHash } from 'src/helpers/StringCrypto';
import { ConfigService } from '@nestjs/config';
import { PostQuizDto } from './dto/quiz.dto';

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
  async getQuizes(@Headers() headers: { device_token: string }) {
    try {
      const device_token = headers.device_token;
      const decrypted_token = decodeHash(device_token);
      if (!device_token || !decrypted_token) {
        throw { message: { message: 'Token not found' } };
      }
      // Logger.log(encodeString(device_token), 'hashed device token');
      const numbers = NumberGenerate.oneTo1154();
      const pokemonRequests = [];

      numbers.forEach((number) => {
        pokemonRequests.push(
          firstValueFrom(
            this.http.get(`https://pokeapi.co/api/v2/pokemon/${number}`),
          ),
        );
      });
      //   Logger.log(pokemonRequests, 'pokemonRequests');
      const pokemonResponses = await Promise.all(pokemonRequests);
      const responseMap = (pokemon: any) => {
        return {
          id: encodeString(`${pokemon.data.id}`),
          sprites: {
            front_default: encodeString(pokemon.data.sprites.front_default),
            back_default: encodeString(pokemon.data.sprites.back_default),
          },
        };
      };
      // Logger.log(pokemonResponses[0].data, 'pokemonResponses');
      return pokemonResponses.map(responseMap);
    } catch (error) {
      Logger.log(error, 'error 59');
      const errorObj = globalExceptionFIlter.catch(error);

      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  @Post()
  async postQuiz(
    @Body() quizDto: [PostQuizDto],
    @Headers() headers: { device_token: string },
  ) {
    try {
      const device_token = headers.device_token;
      const decrypted_token = decodeHash(device_token);
      if (!device_token || !decrypted_token) {
        throw { message: { message: 'Token not found / tampered' } };
      }
      // user is given 5 seconds max to answer to get bonus points
      // if user answers above 5 seconds then the default score will be 100
      // for every second that the user doesn't use, it will be multiplied by 50
      // if the user answer is wrong then the score is 0

      // Logger.log(decodeHash(device_token), 'decodeHash');
      const decodedIds = quizDto.map((each) => {
        // Logger.log('encodeid', decodeHash(each.id));
        return { ...each, id: +decodeHash(each.id) };
      });

      const pokemonRequests = [];

      decodedIds.forEach((data) => {
        if (data.id) {
          pokemonRequests.push(
            firstValueFrom(
              this.http.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`),
            ),
          );
        }
      });
      if (!pokemonRequests.length) {
        throw { message: { message: 'incorrect ids / id tampered' } };
      }
      const pokemonResponses = await Promise.all(pokemonRequests);

      const reducedPokemonId = pokemonResponses.reduce((acc, pokemon) => {
        return { ...acc, [pokemon.data.id]: pokemon.data.name };
      }, {});
      let totalScore: number = 0;

      decodedIds.forEach((each) => {
        if (reducedPokemonId[each.id]) {
          if (
            reducedPokemonId[each.id].toLowerCase() ===
            each.answer.toLowerCase()
          ) {
            totalScore += 100;

            let bonusTime: number = 5 - each.timeCompleted;

            if (bonusTime > 0) {
              totalScore += bonusTime * 50;
            }
          }
        }
      });
      return await this.leaderboardService.create(
        { score: Math.ceil(+totalScore), type: 10 },
        decrypted_token,
      );
    } catch (error) {
      Logger.log(error, 'error 59');
      const errorObj = globalExceptionFIlter.catch(error);

      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
