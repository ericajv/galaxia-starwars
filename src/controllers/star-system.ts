import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UpdateStarSystemsDto } from "src/dto/star-systems/update-star-systems.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('/star-system')
@UseGuards(AuthGuard)
export class StarSystemController {
  constructor(private prisma: PrismaService) { }

  @Get('/')
  async get() {
    return await this.prisma.starSystem.findMany()
  }

  @Post('/')
  @HttpCode(201)
  async post(@Body() body: any) {
    const { name, description } = body
    await this.prisma.starSystem.create({
      data: { name, description }
    })
  }
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const starSystem = await this.prisma.starSystem.findUnique({ where: { id } })

    if (!starSystem) {
      throw new HttpException(`Star system ${id} not found`, HttpStatus.BAD_REQUEST)
    }
    return starSystem
  }
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.prisma.starSystem.delete({
      where: { id }
    })
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateStarSystemsDto) {
    const { name, description } = body

    try {
      return await this.prisma.starSystem.update({
        where: { id },
        data: { name, description }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException(`Planet ${id} not found`, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }

}