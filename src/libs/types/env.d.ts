export type Env = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  DATABASE_URL: string;
  GRAPHQL_PLAYGROUND: boolean;
  GRAPHQL_DEBUG: boolean;
}