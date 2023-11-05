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
  // Version,
  Headers,
  HttpCode,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPipe } from './user.pipe';

@Controller('user')
// @Controller({
//   path: 'user',
//   version: '1',
// })
export class UserController {
  constructor(
    @Inject('_user_') private readonly userService: UserService,
    @Inject('Huawei') private sloganValue: string[],
  ) {}

  @Post()
  create(@Body(UserPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
  // @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    // 也可以用 + 进行运算，隐式转换为 number 类型
    // return this.userService.remove(+id);
    return this.userService.remove(id);
  }
}
