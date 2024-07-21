import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error(`Prisma Exception: ${exception.message}`);

    const target = exception.meta?.target;
    let code = 'INTERNAL_SERVER_ERROR';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = '예기치 않은 오류가 발생했습니다';
    switch (exception.code) {
      case 'P2002':
        code = 'UNIQUE_CONSTRAINT_FAILED';
        status = HttpStatus.CONFLICT;
        message = Array.isArray(target)
          ? `다음 필드에 대한 고유 제약 조건 실패: ${target.join(', ')}`
          : '고유 제약 조건 실패';
        break;
      case 'P2003':
        code = 'FOREIGN_KEY_CONSTRAINT_FAILED';
        status = HttpStatus.BAD_REQUEST;
        message = '외래 키 제약 조건 실패';
        break;
      case 'P2025':
        code = 'RECORD_NOT_FOUND';
        status = HttpStatus.NOT_FOUND;
        message = '요청한 레코드를 찾을 수 없습니다';
        break;
      default:
        break;
    }

    return new GraphQLError(message, {
      extensions: {
        code,
        status,
      },
    });
  }
}
