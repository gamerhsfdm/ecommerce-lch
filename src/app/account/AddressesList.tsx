import { MapPin, Pencil, Trash2, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockAddresses = [
  {
    id: 1,
    alias: "Casa Principal",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo, SP",
    default: true,
  },
  {
    id: 2,
    alias: "Escritório",
    address: "Av. Paulista, 400 - Conj. 501",
    city: "São Paulo, SP",
    default: false,
  },
];

export const AddressesList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">
          Meus Endereços
        </h2>
        <Button 
          variant="outline" 
          className="text-purple-600 border-purple-300 hover:bg-purple-50"
        >
          <PlusCircle size={20} className="mr-2" />
          Novo Endereço
        </Button>
      </div>
      <Separator className="my-4" />

      <div className="grid gap-6 md:grid-cols-2">
        {mockAddresses.map((addr) => (
          <div 
            key={addr.id} 
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
          >
            {addr.default && (
              <span className="absolute top-0 right-0 mt-[-10px] mr-[-10px] bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Padrão
              </span>
            )}

            <div className="flex items-center gap-3 mb-3">
              <MapPin size={20} className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                {addr.alias}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600">{addr.address}</p>
            <p className="text-sm text-gray-600 mb-4">{addr.city}</p>

            <div className="flex gap-2 pt-2 border-t mt-3 border-gray-100">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                <Pencil size={16} className="mr-1" /> Editar
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                <Trash2 size={16} className="mr-1" /> Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};