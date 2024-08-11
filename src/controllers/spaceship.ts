import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateSpaceshipDto } from "src/dto/spaceship/create-spaceship.dto";
import { UpdateSpaceshipDto } from "src/dto/spaceship/update-spaceship.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/spaceships')
export class SpaceshipController{
  constructor(private prisma: PrismaService) {}
    
  @Get('/')
  async getAll() {
    return await this.prisma.spaceship.findMany()
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreateSpaceshipDto) {
    const { name, model, manufacturer, capacity} = body
    
    await this.prisma.spaceship.create({
      data: { name, model, manufacturer, capacity }
    })
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const spaceship = await this.prisma.spaceship.findUnique({ where: { id } })

    if (!spaceship) {
      throw new HttpException(`Spaceship ${id} not found`, HttpStatus.BAD_REQUEST)
    }

    return spaceship
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.prisma.spaceship.delete({
      where: { id }
    })
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateSpaceshipDto) {
    const { name, model, manufacturer, capacity } = body

    try {
      return await this.prisma.spaceship.update({
        where: { id },
        data: { name, model, manufacturer, capacity }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException(`Spaceship ${id} not found`, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }
}