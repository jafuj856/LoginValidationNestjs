import { Injectable } from '@nestjs/common';
import { CreateAdminrolDto } from './dto/create-adminrol.dto';
import { UpdateAdminrolDto } from './dto/update-adminrol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminrolsService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>){}

 async activation( userDetailse:any) {
        const email= userDetailse?.email
   const user = await this.userModel.findOneAndUpdate({email},{ $set: { IsActive:  userDetailse?.activation } },
       { new: true })
       console.log(user.IsActive)
      if(user){
         return {message:`user Activation is ${user.IsActive}`}
      }
    
  }


}
