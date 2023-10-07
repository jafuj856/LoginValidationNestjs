import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }
    
    /*The canActivate method is an asynchronous method that determines whether a route 
    should be activated or not based on the authentication status 
    and the 'isPublic' metadata.*/
    async canActivate(context: ExecutionContext): Promise<any> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}