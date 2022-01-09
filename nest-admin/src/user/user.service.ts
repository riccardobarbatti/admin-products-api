import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
     constructor(
         @InjectRepository(User) private readonly userRepository: Repository<User>
     ) {
     }
     //get all users
     async getAllUsers(): Promise<User[]>{
          return await this.userRepository.find();

     }
     //create user
     async createUser(data): Promise<User>{
          return await this.userRepository.save(data);
     }
     //login user find
     async findUser(condition): Promise<User>{
          return this.userRepository.findOne(condition);

     }
     //update implemnet
     async updateUser(id:number, data): Promise<any>{
          return this.userRepository.update(id, data);

     }





}
