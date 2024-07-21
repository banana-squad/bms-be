import { UserRole } from '@/user/models/user-role.enum';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(type => ID)
  id: string;

  @Field(() => UserRole)
  role: UserRole;
}
