import { Module } from '@nestjs/common';
import { AdminrolsService } from './adminrols.service';
import { AdminrolsController } from './adminrols.controller';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [UserModule,MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [AdminrolsController],
  providers: [AdminrolsService],
})
export class AdminrolsModule {}
