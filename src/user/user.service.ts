import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { SignUpDto } from 'src/auth/dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as jwt from 'jsonwebtoken';

import { log } from 'console'; 

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<any>){}

    // SignUp
    async signup(user: SignUpDto): Promise<{message: string}> {
            // check if user exists
            const userExists = await this.userModel.findOne({email: user.email}); 
    
            //custom validation mesage for email already exists
            if (userExists) {
                throw new HttpException(
                  'Email already exists. Please log in to your account.',
                  HttpStatus.CONFLICT,
                );
              }
    
            // Hash the password
            const hashedPassword= await bcrypt.hash(user.password, 10);

            // Saving user
            const newUser = new this.userModel({
                email: user.email,
                password: hashedPassword
            })
    
            await newUser.save();

            return {
                "message": "Signup Success. You Can Login To Your Account Now"
            }
        }

    // Login
    async login(user: LoginDto): Promise<{message: string, token: string}> {

        const foundUser = await this.userModel.findOne({email: user.email});
          console.log(foundUser)
        // Email is wrong or user does not exist
        if (!foundUser) {
            throw new HttpException(
                'User Not Found. Please Check Your Credentials or Create an Account',
                HttpStatus.NOT_FOUND
            )
        }
        if(foundUser?.IsActive===false){
             return {message:'you are blocked by admin',token:`you can't access`}
        }
       
        const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);

    
        if (!isPasswordValid) {
            throw new HttpException(
                'Password is wrong',
                HttpStatus.BAD_REQUEST
            )
        }

        const payload = {
          sub: foundUser._id,
        }

        
        const token = jwt.sign(payload, 'secret');
            
        return {
            "message": "Login Successful",
            "token": token
        }

    }

    // Get User By Id
    async getUserById(id: string) {        
        return await this.userModel.findById(id);   
    }
    
}
