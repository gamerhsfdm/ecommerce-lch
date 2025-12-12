import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BlingResponse, BlingProductItem } from './types/bling-product';
import { Product } from '@prisma/client'; 
import { firstValueFrom } from 'rxjs'; // Utilitário para async/await com Observables

@Injectable()
export class BlingService {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('BLING_API_KEY') || '';
    this.baseUrl = this.configService.get<string>('BLING_API_URL') || '';
  }

  /**
   * Função central para mapear o tipo BlingProductItem (externo) 
   * para o tipo Product (interno, definido no Prisma/types).
   */
  private transformToProduct(blingItem: BlingProductItem): Product {
    // 💡 IMPORTANTE: Converte e padroniza os campos
    return {
      id: String(blingItem.id), 
      name: blingItem.nome,
      description: 'Descrição padrão: Material de Papelaria', // Precisa ser complementado ou buscado
      price: blingItem.preco,
      stock: blingItem.estoque.quantidade,
      // Campos obrigatórios do seu modelo Product (mesmo que o Bling não os envie):
      createdAt: new Date(), 
      updatedAt: new Date(),
    } as Product; 
  }

  async getProductsFromBling(): Promise<Product[]> {
    if (!this.apiKey || !this.baseUrl) {
        throw new InternalServerErrorException('Credenciais do Bling ausentes.');
    }
    
    // Filtra apenas produtos ATIVOS. Use seu filtro específico aqui.
    const url = `${this.baseUrl}/produtos?apikey=${this.apiKey}&situacao=A`; 

    try {
      // Faz a requisição e espera a resposta, tipada como BlingResponse
      const response = await firstValueFrom(
        this.httpService.get<BlingResponse>(url),
      );

      const blingProducts = response.data.data;

      if (!blingProducts) return [];
      
      // Retorna os produtos mapeados e tipados no formato Product[]
      return blingProducts.map(item => this.transformToProduct(item));

    } catch (error) {
      console.error('Erro ao buscar produtos do Bling:', error.message);
      // Retorna uma lista vazia ou lança um erro, dependendo da sua regra de negócio
      return []; 
    }
  }
}