import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 15)
  userName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
  createdDate?: Date;
}
