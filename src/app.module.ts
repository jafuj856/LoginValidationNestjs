import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards/at.guard';
import { AtStrategy } from './auth/strategies';
import { AdminrolsModule } from './adminrols/adminrols.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb+srv://jafuj856:jpcp1234@cluster0.c57ci1c.mongodb.net/uservalidation'),
    PassportModule,
    UserModule,
    AuthModule,
    AdminrolsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AtStrategy, // For passport jwt strategy
    {
      provide: APP_GUARD,
      useClass: AtGuard// Globally calling AtGuard
    } 
],
})
export class AppModule {}
