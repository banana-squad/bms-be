import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTimeISO } from 'graphql-scalars';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field(type => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(type => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
