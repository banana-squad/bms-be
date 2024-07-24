import { User } from '@/user/models/user.model';
import { ArgsType, PartialType } from '@nestjs/graphql';

@ArgsType()
export class UserArgs extends PartialType(User, ArgsType) {}
