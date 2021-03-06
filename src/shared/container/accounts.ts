import { container } from 'tsyringe';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
