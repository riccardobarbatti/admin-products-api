import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {registerDto} from "./models/register.dto";
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import {AuthGuard} from "./auth.guard";
//import {AuthInterceptor} from "./auth.interceptor";

//use interceptor to exclude password return
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
   // private saltOrRounds: ;
    private saltOrRounds: number = 12;
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    //create new user
    @Post('register')
    async register(@Body() body:registerDto) {
        if(body.password !== body.password_confirm){
            throw new BadRequestException('password did not match');
        }
        const hashed = await bcrypt.hash(body.password, this.saltOrRounds);
        return this.userService.createUser({
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: hashed,
        });
    }

    //login process
    @Post ('login')
    async login(
     @Body('email') email: string,
     @Body('password') password: string,
     @Res({passthrough:true}) response: Response
    ){
        const user = await this.userService.findUser({ email: email });
        //check fields
        if(!user){
            throw new NotFoundException('User not found!');
        }
        if(!await bcrypt.compare(password, user.password)){
            throw new NotFoundException('Invalid password!');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});
        //save jwt cookie
        response.cookie('jwt', jwt, {httpOnly: true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request){
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);

        //return data;
        //connect id user login
        return this.userService.findUser({id:data['id']});

    }
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true}) response: Response) {
            response.clearCookie('jwt');

            return{
                message: 'Success'
            }
        }

}
