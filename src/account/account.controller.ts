import {
  // BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  // NotFoundException,
  Body,
  UseGuards,
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { AccountDto } from './dto/account.dto';
// import { LoginDto } from './dto/login.dto';
// import { ExceptionDto } from './dto/exception.dto';
// import { LoginError } from './dto/Login.response';
import { MessageResponse } from './dto/response-msg.dto';

import { Account } from './account.entity';
import { AccountService } from './account.service';
// import { AuthService } from 'src/auth/auth.service';

// import passwordEncDec from 'src/helpers/Bcrypt';
import { IResponseError } from 'src/error-handler/response.error.interface';
import { GlobalExceptionFilter } from 'src/error-handler/exception.filter';

import { LocalAuthGuard } from 'src/auth/local-auth.guard';

const globalExceptionFIlter = new GlobalExceptionFilter();

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService, // private readonly authService: AuthService,
  ) {}

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
        status: 201,
      };
    } catch (error) {
      Logger.log(error, 'error 41');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
      //   return error;
    }
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<AccountDto[] | IResponseError> {
    try {
      const response = await this.accountService.findAll();
      // new ValidationPipe()
      // return response.map((data) => {
      //   return new AccountDto(data);
      // });
      return response;
    } catch (error) {
      Logger.log(error, 'error findAll');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  // @Catch(QueryFailedError)

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //     return this.accountService.findOne(id);
  //   }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: [string]; status: number }> {
    try {
      const response = await this.accountService.remove(id);
      return {
        message: [response],
        status: 200,
      };
    } catch (error) {
      Logger.log(error, 'error findAll');
      const errorObj = globalExceptionFIlter.catch(error);
      throw new HttpException(errorObj, errorObj.statusCode);
    }
  }
}
