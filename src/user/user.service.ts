import { UpdateUserInput } from '@/user/dto/update-user.input';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async getUserByName(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async loginUser(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new UnauthorizedException('해당 유저는 존재하지 않습니다', { description: 'UNAUTHORIZED' });

    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data });
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
