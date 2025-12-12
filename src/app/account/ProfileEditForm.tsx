import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ProfileEditForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Editar Perfil
      </h2>
      <Separator className="my-4" />
      
      <form className="space-y-4 max-w-lg">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nome Completo
          </Label>
          <Input 
            id="name" 
            defaultValue="Maria Souza" 
            placeholder="Seu nome completo"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input 
            id="email" 
            type="email" 
            defaultValue="maria.souza@email.com" 
            placeholder="Seu endereço de email"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">
            O email é usado para login e não pode ser alterado aqui.
          </p>
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefone
          </Label>
          <Input 
            id="phone" 
            defaultValue="(11) 99876-5432" 
            placeholder="(xx) xxxxx-xxxx"
          />
        </div>

        <div className="pt-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 shadow-md transition-colors"
          >
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
};