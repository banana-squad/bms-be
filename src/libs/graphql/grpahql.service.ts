import { EnvService } from '@/libs/env/env.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

type OriginError = {
  message: string;
  error: string;
  statusCode: HttpStatus;
};

@Injectable()
export class GraphQLService {
  constructor(private envService: EnvService) {}

  createOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: this.envService.get('GRAPHQL_PLAYGROUND'),
      debug: this.envService.get('GRAPHQL_DEBUG'),
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
