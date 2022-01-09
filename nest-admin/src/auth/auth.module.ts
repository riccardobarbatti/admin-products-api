import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import { CommonModule } from 'src/common/common.module';

let jwtConstants: string = "barbacode777";

@Module({
  imports:[
    UserModule,
    CommonModule

  ],
  controllers: [AuthController]
})
export class AuthModule {}
