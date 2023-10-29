import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: '_user_',
      useClass: UserService,
    },
    {
      provide: 'Huawei',
      useValue: ['遥遥领先'],
    },
  ],
})
export class UserModule {}
