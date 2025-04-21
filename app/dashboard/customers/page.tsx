import { Metadata } from "next";

// Defina o metadata para a página
export const metadata: Metadata = {
    title: 'Customers',
    description: 'Client page Acme Dashboard',
};

// Função para buscar os clientes (simulação ou integração com API)
async function fetchCustomers() {
    // Substitua por uma chamada real à API ou banco de dados
    return [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
}

export default async function Page() {
    const customers = await fetchCustomers(); // Busca os clientes

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <ul className="space-y-2">
                {customers.map((customer) => (
                    <li key={customer.id} className="p-4 border rounded-md">
                        <p className="font-medium">Name: {customer.name}</p>
                        <p className="text-sm text-gray-600">Email: {customer.email}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}