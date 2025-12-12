import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BlingModule } from '../bling/bling.module'; // Importe o Bling
import { PrismaModule } from '../prisma/prisma.module'; // Importe o Prisma

@Module({
  imports: [BlingModule, PrismaModule], // Adicione aqui
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}