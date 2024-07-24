import { EnvModule } from '@/libs/env/env.module';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as _GraphQLModule } from '@nestjs/graphql';
import { GraphQLService } from './grpahql.service';

@Module({
  imports: [
    EnvModule,
    _GraphQLModule.forRootAsync({
      imports: [GraphQLModule],
      useFactory: (graphQLService: GraphQLService) => graphQLService.createOptions(),
      inject: [GraphQLService],
      driver: ApolloDriver,
    }),
  ],
  providers: [GraphQLService],
  exports: [GraphQLService],
})
export class GraphQLModule {}
