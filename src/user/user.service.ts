import { UserArgs } from '@/user/dto/user.args';
import { UpdateUserInput } from '@/user/dto/update-user.input';
import { GoneException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/libs/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(user?: UserArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        ...user,
        createdAt: {
          gt: user?.createdAt,
        },
        deletedAt: null,
      },
    });
  }

  async getUserByName(username: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  async loginUser(username: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    }).then(user => {
      if (user.deletedAt !== null) throw new GoneException('탈퇴한 회원 입니다', { description: 'GONE' });

      return user;
    })
      .catch(() => {
        throw new UnauthorizedException('존재하지 않는 회원입니다.', { description: 'UNAUTHORIZED' });
      });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  async updateUser({ id, ...data }: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
