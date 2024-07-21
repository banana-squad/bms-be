import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLConfigService } from './grpahql.service';

@Module({
  imports: [ConfigModule],
  providers: [GraphQLConfigService],
  exports: [GraphQLConfigService],
})
export class GraphQLConfigModule {}
