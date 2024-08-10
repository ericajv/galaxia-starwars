import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateCharactertDto } from "src/dto/character/create-character.dto";
import { UpdateCharactertDto } from "src/dto/character/update-character.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/characters')
@UseGuards(AuthGuard)
export class CharactertController{
  constructor(private prisma: PrismaService) {}
    
  @Get('/')
  async getAll() {
    return await this.prisma.character.findMany()
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreateCharactertDto) {
    const { name, race, affiliation, planetId} = body
    
    await this.prisma.character.create({
      data: { name, race, affiliation, planetId }
    })
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const character = await this.prisma.character.findUnique({ where: { id } })

    if (!character) {
      throw new HttpException(`Character ${id} not found`, HttpStatus.BAD_REQUEST)
    }

    return character
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.prisma.character.delete({
      where: { id }
    })
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCharactertDto) {
    const { name, race, affiliation } = body

    try {
      return await this.prisma.character.update({
        where: { id },
        data: { name, race, affiliation }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new HttpException(`Character ${id} not found`, HttpStatus.BAD_REQUEST)
      }

      throw error
    }
  }
}