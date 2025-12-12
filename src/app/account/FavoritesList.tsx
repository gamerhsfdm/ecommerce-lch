import { HeartOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const mockFavorites = [
  { id: 1, name: "Caderno Minimalista A4", price: "R$ 49,90", image: "/mock-notebook.jpg" },
  { id: 2, name: "Kit Canetas Pastel (6 cores)", price: "R$ 35,00", image: "/mock-pens.jpg" },
  { id: 3, name: "Planner Diário 2026", price: "R$ 79,90", image: "/mock-planner.jpg" },
];

export const FavoritesList: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Meus Favoritos
      </h2>
      <Separator className="my-4" />
      
      <p className="text-gray-600 mb-4">
        Produtos que você marcou com o ♥.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFavorites.map((product) => (
          <Card key={product.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-0">
              {/* Mock de Imagem */}
              <div className="h-40 bg-gray-100 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-400">IMAGEM</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
              <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </CardTitle>
              <p className="text-xl font-bold text-purple-600">{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-red-500 border-red-300 hover:bg-red-50"
              >
                <HeartOff size={16} className="mr-2" />
                Remover
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};