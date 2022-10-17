import {
  Body,
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

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: AccountDto): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //     return this.accountService.findOne(id);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<void> {
  //     return this.accountService.remove(id);
  //   }
}
