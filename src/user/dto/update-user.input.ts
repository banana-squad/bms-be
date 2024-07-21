import { User } from '@/user/models/user.model';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PickType(User, ['id', 'role'], InputType) {}
