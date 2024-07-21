import { GraphQLConfigService } from '@/libs/graphql/grpahql.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { GraphQLConfigModule } from '@/libs/graphql/grpahql.module';

@Module({
  imports: [
    ConfigModule.forRoot({

    }),
    GraphQLModule.forRootAsync({
      imports: [GraphQLConfigModule],
      useFactory: (graphqlConfigService: GraphQLConfigService) => graphqlConfigService.createGqlOptions(),
      inject: [GraphQLConfigService],
      driver: ApolloDriver,
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
