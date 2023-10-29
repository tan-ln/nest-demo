import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Version,
  Headers,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
// @Controller({
//   path: 'user',
//   version: '1',
// })
export class UserController {
  private users: User[] = [];

  constructor(
    @Inject('_user_') private readonly userService: UserService,
    @Inject('Huawei') private sloganValue: string[],
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
    const user = {
      ...createUserDto,
      createdDate: createUserDto.createdDate
        ? new Date(createUserDto.createdDate)
        : new Date(),
      id: this.users.length + 1,
    };

    this.users.push(user);
    return user;
  }

  @Post('save')
  @HttpCode(500)
  createUser(@Headers() headers, @Request() req) {
    console.log(headers, req.body);
    return {
      message: 'response message',
      data: this.sloganValue.join(','),
    };
  }

  @Post('form')
  form(@Body() body) {
    console.log(body);
    return {
      code: 200,
    };
  }

  @Post('shop')
  shop(@Body('prodName') body) {
    console.log(body);
    return {
      code: 200,
    };
  }

  @Get('findByName')
  // find(@Request() req) {
  find(@Query() query) {
    // console.log(req.query);
    console.log(query);
    return {
      code: 200,
    };
  }

  @Get()
  // localhost:3000/v1/user 访问
  @Version('1')
  findAll() {
    // return this.userService.findAll();
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // return this.userService.findOne(+id);
    return this.users.find((user) => user.id === id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
    const targetIdx = this.users.findIndex((user) => user.id === id);
    const newUser = {
      ...this.users[targetIdx],
      ...updateUserDto,
    };

    this.users.splice(targetIdx, 1, newUser);
    console.log(this.users);

    return newUser;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    // return this.userService.remove(+id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
