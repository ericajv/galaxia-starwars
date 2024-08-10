import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  @Post('/signup')
  async register(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({ where: { email } })

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail address already exists.')
    }

    const hashedPassword = await hash(password, 8)
    
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    const token = await this.jwtService.signAsync({ sub: user.id, email: user.email })

    return { id: user.id, name, email, token }
  }

  @Post('/signin')
  async signIn(@Body() body: any) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const payload = { sub: user.id, email: user.email }

    return { token: await this.jwtService.signAsync(payload) }
  }
}
