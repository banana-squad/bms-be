import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { EnvModule } from '@/libs/env/env.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { GraphQLModule } from '@/libs/graphql/grpahql.module';

@Module({
  imports: [
    EnvModule,
    GraphQLModule,
    PrismaModule,
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
