import { Env } from '@/libs/types/env';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

type OriginError = {
  message: string;
  error: string;
  statusCode: HttpStatus;
};

@Injectable()
export class GraphQLConfigService {
  constructor(private configService: ConfigService<Env>) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: this.configService.get<boolean>('GRAPHQL_PLAYGROUND', true),
      debug: this.configService.get<boolean>('GRAPHQL_DEBUG', true),
      formatError: (error) => {
        if (error.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
          return {
            message: error.message,
            extensions: {
              code: error.extensions.code,
              status: HttpStatus.BAD_REQUEST,
            },
          };
        }

        const originError = error.extensions.originalError as Partial<OriginError>;

        return {
          message: error.message,
          extensions: {
            code: originError?.error ?? error.extensions.code ?? 'INTERNAL_SERVER_ERROR',
            status: originError?.statusCode ?? error.extensions.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
          },
        };
      },
    };
  }
}
