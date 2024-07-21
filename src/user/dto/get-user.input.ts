import { User } from '@/user/models/user.model';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class GetUserInput extends PartialType(User, InputType) {}
