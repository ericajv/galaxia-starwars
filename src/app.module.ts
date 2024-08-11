import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PlanetController } from './controllers/planet';
import { StarSystemController } from './controllers/star-system';
import { CharactertController } from './controllers/character';
import { SpaceshipController } from './controllers/spaceship'
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [PlanetController, StarSystemController, CharactertController, SpaceshipController],
  providers: [PrismaService],
  imports: [AuthModule],
})
export class AppModule {}
