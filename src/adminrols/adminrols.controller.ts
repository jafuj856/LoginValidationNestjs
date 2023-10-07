import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { AdminrolsService } from './adminrols.service';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from 'src/user/schema/user.schema';
import { RoleGuard } from 'src/shared/guards/roles.guard';

@Controller('adminrols')
export class AdminrolsController {
  constructor(private readonly adminrolsService: AdminrolsService) {}


  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  userActivation(@Body() userDetailse:any) {


    return this.adminrolsService.activation(userDetailse);
  }


}
