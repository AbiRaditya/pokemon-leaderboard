import {
  BadRequestException,
  Body,
  Catch,
  Controller,
  //   Delete,
  Get,
  //   Param,
  Post,
  //   ParseIntPipe,
} from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { Account } from './account.entity';
import { AccountService } from './account.service';
// import { QueryFailedError } from 'typeorm';
import { Logger } from '@nestjs/common';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { MessageResponse } from './interfaces/response.msg.interface';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';

// import { ValidationPipe } from '@nestjs/common';
const globalExceptionFIlter = new GlobalExceptionFilter();

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Body() createAccountDto: AccountDto,
  ): Promise<Account | MessageResponse | IResponseError> {
    try {
      const response = await this.accountService.create(createAccountDto);
      Logger.log(response, 'response 29', response);
      if (!response.id) {
        throw response;
      }
      // if (response) {
      //   throw new BadRequestException();
      // }
      return {
        message: [
          `Account ${response.username} created succesfully with id ${response.id}`,
        ],
        status: 200,
      };
    } catch (error) {
      Logger.log(error, 'error 41');
      return globalExceptionFIlter.catch(error);
      //   return error;
    }
  }

  @Get()
  async findAll(): Promise<Account[] | IResponseError> {
    try {
      return this.accountService.findAll();
    } catch (error) {
      Logger.log(error, 'error 41');
      return globalExceptionFIlter.catch(error);
    }
  }

  @Post()
  async login(): Promise<Account> {
    // this.accountService.findOne()
    return;
  }
  // @Catch(QueryFailedError)

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //     return this.accountService.findOne(id);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<void> {
  //     return this.accountService.remove(id);
  //   }
}
