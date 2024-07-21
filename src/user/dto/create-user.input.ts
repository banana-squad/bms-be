import { User } from '@/user/models/user.model';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput extends PickType(User, ['username'], InputType) {}
