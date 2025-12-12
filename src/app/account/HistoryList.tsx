import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const mockHistory = [
  { date: "20/11/2025", description: "Caderno A5, Caneta Gel Roxa", total: "R$ 75,00" },
  { date: "15/09/2025", description: "Planner Semanal 2026, Washi Tape Kit", total: "R$ 90,50" },
  { date: "01/07/2025", description: "Mochila Escolar, Estojo Duplo", total: "R$ 180,00" },
  { date: "03/05/2025", description: "Conjunto de Marcadores Pastel", total: "R$ 49,90" },
];

export const HistoryList: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Histórico de Compras
      </h2>
      <Separator className="my-4" />
      
      <p className="text-gray-600 mb-4">
        Aqui estão todos os seus pedidos finalizados e suas compras passadas.
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px] text-gray-700">Data da Compra</TableHead>
              <TableHead className="text-gray-700">Itens Comprados (Resumo)</TableHead>
              <TableHead className="text-right text-gray-700">Total Gasto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-900">{item.date}</TableCell>
                <TableCell className="text-sm text-gray-600">{item.description}</TableCell>
                <TableCell className="text-right font-semibold text-gray-800">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};