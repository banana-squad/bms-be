import { GetUserInput } from '@/user/dto/get-user.input';
import { UpdateUserInput } from '@/user/dto/update-user.input';
import { GoneException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/libs/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(user?: GetUserInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        ...user,
        deletedAt: null,
      },
    });
  }

  async getUserByName(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  async loginUser(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new UnauthorizedException('존재하지 않은 회원 입니다.', { description: 'UNAUTHORIZED' });
    if (user.deletedAt !== null) throw new GoneException('탈퇴한 회원 입니다', { description: 'GONE' });

    return user;
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
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
