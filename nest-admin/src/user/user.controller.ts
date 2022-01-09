import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param, Patch,
    Post, Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UserService} from "./user.service";
import { User } from "./models/user.entity";
import * as bcrypt from 'bcryptjs';
import {UserCreateDto} from "./models/dto/user-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UserUpdateDto} from "./models/dto/user-update.dto";

//prefix /api/users
//use interceptor to exclude password return
@UseInterceptors(ClassSerializerInterceptor)
//add guard access
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
   //constructor user service
   constructor(private userService: UserService) {}

    //Get All Users Methods | http://localhost:8000/api/users
    @Get()
    async all(): Promise<User[]> {
       //return alla users
      return this.userService.getAllUsers();
       // return ['users'];
    }

    //Create User | http://localhost:8000/api/users
    //Hardcode password
    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
      const  password = await bcrypt.hash('1234',12);
      return this.userService.createUser({
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          password
        });
    }

    //find user id
    @Get(':id')
    async get(@Param('id') id: number){
       return this.userService.findUser({id});

    }

    //update user
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body:UserUpdateDto

    ) {
      await this.userService.updateUser(id, body);
      return this.userService.findUser({id})

    }

}