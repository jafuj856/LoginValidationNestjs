import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminrolDto } from './create-adminrol.dto';

export class UpdateAdminrolDto extends PartialType(CreateAdminrolDto) {
    
IsActive?:boolean
}
