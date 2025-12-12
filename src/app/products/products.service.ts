import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Mantemos caso precise salvar pedidos
import { Product } from '@prisma/client';
import { BlingService } from '../bling/bling.service'; // Importe o novo serviço

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private blingService: BlingService, // Injete o BlingService
  ) {}

  // O Controller chama este método
  async findAll(): Promise<Product[]> {
    // 💡 Agora ele simplesmente chama o serviço do Bling
    return this.blingService.getProductsFromBling();
  }

  // Se você tiver um findOne, ele também precisaria buscar no Bling, 
  // usando o 'id' (código/sku)
  // ...
}