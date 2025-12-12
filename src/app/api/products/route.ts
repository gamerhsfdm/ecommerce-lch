import { NextResponse } from "next/server";
import axios from "axios";
import { Product } from "../../../types/product"; // Importação para tipagem

// Variável de ambiente deve armazenar o Access Token obtido via OAuth 2.0
const accessToken = process.env.BLING_ACCESS_TOKEN;

// URL de Fallback válida e externa para imagens
const FALLBACK_IMAGE_URL = "https://via.placeholder.com/1200x800?text=Sem+Foto+Bling";

export async function GET() {
  if (!accessToken) {
    return NextResponse.json(
      { error: "BLING_ACCESS_TOKEN não configurado. Verifique o Access Token OAuth." },
      { status: 500 }
    );
  }

  // Adiciona paginação e limite de itens para a API v3
  const url = `https://api.bling.com.br/Api/v3/produtos?pagina=1&limite=100`;

  try {
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
        Accept: "application/json",
      },
      // Permite que o Next.js lide com status code que não sejam 2xx (ex: 401, 404, etc)
      validateStatus: () => true, 
    });

    if (resp.status !== 200) {
      // Se a requisição falhar (ex: Token inválido 401), retorna o erro de forma clara
      return NextResponse.json(
        {
          error: "Erro ao consultar Bling",
          status: resp.status,
          details: resp.data,
        },
        { status: resp.status }
      );
    }

    const produtos = resp.data?.data ?? [];

    const list: Product[] = produtos.map((item: any) => {
        
      // TENTA OBTER A IMAGEM REAL: A API v3 retorna um array de imagens. Pegamos a primeira.
      const blingImageUrl = item.imagens?.[0]?.link;
      
      // CORREÇÃO: Usa a URL de fallback COMPLETA se não houver link.
      const imageUrl = blingImageUrl ? blingImageUrl : FALLBACK_IMAGE_URL; 
        
      // TENTA OBTER DESCRIÇÃO CURTA, E SE FALHAR, TENTA A LONGA
      const description = item.descricaoCurta || item.descricaoCompleta || "";

      return {
        id: String(item.id),
        name: item.nome,
        // PREÇO: Arredonda para 2 casas decimais (padrão monetário)
        price: Number(Number(item.preco ?? 0).toFixed(2)), 
        // ESTOQUE: Saldo do estoque. Se for null/undefined, define como 0.
        stock: Number(item.estoque?.saldo ?? 0), 
        imageUrl: imageUrl, // Corrigido
        description: description,
        category: item.categoria?.descricao ?? "Geral",
        createdAt: item.dataInclusao ?? new Date().toISOString(),
        updatedAt: item.dataAlteracao ?? new Date().toISOString(),
      };
    });

    return NextResponse.json(list, { status: 200 });
  } catch (err) {
    console.error("Erro Bling:", err);
    return NextResponse.json(
      { error: "Erro interno ao consultar Bling" },
      { status: 500 }
    );
  }
}