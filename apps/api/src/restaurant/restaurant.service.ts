import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    const data: Prisma.RestaurantCreateInput = { name: createRestaurantDto.name };
    return this.prisma.restaurant.create({ data });
  }

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException(`Restaurant ${id} not found`);
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    await this.findOne(id);
    const data: Prisma.RestaurantUpdateInput = { name: updateRestaurantDto.name };
    return this.prisma.restaurant.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
