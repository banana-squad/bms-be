import { Env } from '@/libs/types/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Injectable()
export class GraphQLConfigService {
  constructor(private configService: ConfigService<Env>) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: this.configService.get<boolean>('GRAPHQL_PLAYGROUND', true),
      debug: this.configService.get<boolean>('GRAPHQL_DEBUG', true),
    };
  }
}
