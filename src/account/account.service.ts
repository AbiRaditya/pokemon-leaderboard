import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(accountDto: AccountDto): Promise<Account> {
    const account = new Account();
    account.device_token = accountDto.device_token;
    account.password = accountDto.password;
    account.type = accountDto.type;

    await this.accountRepository.save(account);
    return;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }
}
