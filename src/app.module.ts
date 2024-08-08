import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PlanetController } from './controllers/planet';

@Module({
  controllers: [PlanetController],
  providers: [PrismaService],
})
export class AppModule {}
