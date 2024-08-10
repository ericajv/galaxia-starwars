import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthGuard } from "src/auth/auth.guard";
import { CreatePlanetDto } from "src/dto/planet/create-planet.dto";
import { UpdatePlanetDto } from "src/dto/planet/update-planet.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/planets')
@UseGuards(AuthGuard)
export class PlanetController{
  constructor(private prisma: PrismaService) {}
    
  @Get('/')
  async getAll() {
    return await this.prisma.planet.findMany()
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreatePlanetDto) {
    const { name, climate, ground, population, starSystemId } = body
    
    await this.prisma.planet.create({
      data: { name, climate, ground, population, starSystemId }
    })
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const planet = await this.prisma.planet.findUnique({ where: { id } })

    if (!planet) {
      throw new HttpException(`Planet ${id} not found`, HttpStatus.BAD_REQUEST)
    }

    return planet
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.prisma.planet.delete({
      where: { id }
    })
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePlanetDto) {
    const { name, climate, ground, population } = body

    try {
      return await this.prisma.planet.update({
        where: { id },
        data: { name, climate, ground, population }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException(`Planet ${id} not found`, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }
}