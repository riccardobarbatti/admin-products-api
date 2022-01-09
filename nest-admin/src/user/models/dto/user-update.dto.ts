import {IsEmail} from 'class-validator';

export class UserUpdateDto {

    //@IsNotEmpty()
    first_name?:string;

    //@IsNotEmpty()
    last_name?:string;

    //@IsNotEmpty()
    @IsEmail()
    email?:string;

    //password:string;



}