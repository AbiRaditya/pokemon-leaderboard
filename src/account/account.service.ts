import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import { Account } from './account.entity';

import { Logger } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(
    accountDto: AccountDto,
  ): Promise<{ id: number; username: string }> {
    try {
      const account = new Account();
      // Logger.log(accountDto, 'accountDto');
      account.username = accountDto.username;
      // account.password = await passwordEncDec.encrypt(accountDto.password);
      account.password = accountDto.password;
      account.type = accountDto.type;

      const { id, username } = await this.accountRepository.save(account);

      return {
        id,
        username,
      };
    } catch (error) {
      // console.log(error, 'create account error');
      return error;
    }
  }

  async findAll(): Promise<Account[]> {
    const response = this.accountRepository
      .createQueryBuilder(`account`)
      .select([`account.id`, `account.username`]);
    return response.getMany();
  }

  async remove(id: string): Promise<string> {
    await this.accountRepository.delete({ id: +id });
    return `Account with id:${id} successfully deleted`;
  }

  async findOne(
    username: string,
  ): Promise<AccountDto & { id: number | string }> {
    try {
      // Logger.log(username, 'username 46');
      // if (!username) {
      //   throw new Error('Username Not Found');
      // }

      const account = await this.accountRepository.findOne({
        where: {
          username: username,
        },
      });

      Logger.log(JSON.stringify(account), 'findOne');
      return account;
    } catch (error) {
      console.log(error);
    }
  }
}
