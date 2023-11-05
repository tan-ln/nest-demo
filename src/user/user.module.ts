import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  // 动态导入，不需要创建两个 数据库连接，只作用于 User Module
  imports: [TypeOrmModule.forFeature([User])],
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
