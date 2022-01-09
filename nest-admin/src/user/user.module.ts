import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import {JwtModule} from "@nestjs/jwt";
import {CommonModule} from "../common/common.module";

let jwtConstants:string = "test";

@Module({
  imports: [
   TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  controllers: [UserController],
  providers: [UserService],
    exports:[UserService]
})
export class UserModule {}
