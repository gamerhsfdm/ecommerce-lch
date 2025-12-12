import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const PasswordChangeForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Alterar Senha
      </h2>
      <Separator className="my-4" />
      
      <form className="space-y-4 max-w-lg">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
            Senha Atual
          </Label>
          <Input 
            id="current-password" 
            type="password" 
            placeholder="Digite sua senha atual"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
            Nova Senha
          </Label>
          <Input 
            id="new-password" 
            type="password" 
            placeholder="Mínimo de 8 caracteres"
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
            Confirme Nova Senha
          </Label>
          <Input 
            id="confirm-password" 
            type="password" 
            placeholder="Repita a nova senha"
          />
        </div>

        <div className="pt-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 shadow-md transition-colors"
          >
            Mudar Senha
          </Button>
        </div>
      </form>
    </div>
  );
};