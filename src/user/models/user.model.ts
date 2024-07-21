import { UserRole } from '@/user/models/user-role.enum';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTimeISO } from 'graphql-scalars';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  updatedAt?: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
