import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const target = exception.meta?.target;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = '예기치 않은 오류가 발생했습니다';
    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = Array.isArray(target)
          ? `다음 필드에 대한 고유 제약 조건 실패: ${target.join(', ')}`
          : '고유 제약 조건 실패';
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = '외래 키 제약 조건 실패';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = '요청한 레코드를 찾을 수 없습니다';
        break;
      default:
        break;
    }

    return new GraphQLError(message, {
      extensions: {
        code: status,
        exception: {
          name: exception.name,
          code: exception.code,
          meta: exception.meta,
        },
      },
    });
  }
}
