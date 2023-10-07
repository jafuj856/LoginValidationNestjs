import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ){}

    async signup(signupdto) {
        return this.userService.signup(signupdto)
    }
    
    async login(logindto) {
        return this.userService.login(logindto);
    }

    
}
