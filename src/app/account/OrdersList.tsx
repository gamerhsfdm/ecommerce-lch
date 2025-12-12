import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  { id: "ORD9876", date: "20/11/2025", total: "R$ 150,00", status: "Entregue" },
  { id: "ORD9875", date: "05/12/2025", total: "R$ 299,90", status: "Em Transporte" },
  { id: "ORD9874", date: "10/12/2025", total: "R$ 45,50", status: "Processando" },
  { id: "ORD9873", date: "11/12/2025", total: "R$ 80,00", status: "Cancelado" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Entregue':
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Entregue</Badge>;
    case 'Em Transporte':
      return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Em Transporte</Badge>;
    case 'Processando':
      return <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">Processando</Badge>;
    case 'Cancelado':
      return <Badge variant="destructive">Cancelado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const OrdersList: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Meus Pedidos
      </h2>
      <Separator className="my-4" />

      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px] text-gray-700">ID do Pedido</TableHead>
              <TableHead className="text-gray-700">Data</TableHead>
              <TableHead className="text-gray-700">Total</TableHead>
              <TableHead className="text-gray-700">Status</TableHead>
              <TableHead className="text-right text-gray-700">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="font-semibold text-gray-800">{order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="text-purple-600 p-0 h-auto hover:text-purple-700">
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
};