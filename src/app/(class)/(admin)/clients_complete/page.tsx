// pages/clients.tsx
"use client";

import { useState } from "react";
import styles from "./styles/Clients.module.css";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import ClientDetails from "./components/ClientDetails";

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

const dummyClients: Client[] = [
  // Replace with your actual client data
  {
    id: 1,
    name: "Client A Client A Client A Client A",
    address: "123 Main St",
    phone: "555-1234",
    taxId: "TAX-123",
    active: true,
  },
  {
    id: 2,
    name: "Client B",
    address: "456 Elm St",
    phone: "555-9012",
    active: false,
  },
  // ... more clients
];


export default function Clients() {
  
  const [clients, setClients] = useState(dummyClients);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10); // Adjust as needed
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Search/filter logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredClients = dummyClients.filter((client) =>
      Object.values(client).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
    setClients(filteredClients);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Create client logic
  const handleCreate = () => {
    setIsCreating(true);
    setSelectedClient(null)
  };

  const handleCreateSubmit = (newClient: Client) => {
    setClients([...clients, { ...newClient, id: clients.length + 1 }]);
    setIsCreating(false);
  };


  // Edit client logic
  const handleEdit = (client: Client) => {
    setIsEditing(true);
    setSelectedClient(null)
    setEditingClient(client);
  };

  const handleEditSubmit = (updatedClient: Client) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setIsEditing(false);
    setEditingClient(null);
  };


 // Non-active client logic
  const handleToggleActive = (clientId: number) => {
    setClients(
      clients.map((client) =>
        client.id === clientId ? { ...client, active: !client.active } : client
      )
    );
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false);
    setIsCreating(false);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h1>Clients</h1>

      {/* Create Client Button */}
      <div className={styles.createButtonContainer}>
        <button onClick={handleCreate} className={styles.createButton}>
          Create Client
        </button>
      </div>
      {/* ... (create/edit client form) ... */}
      {(isCreating || isEditing) && (
        <ClientForm // Use ClientForm component
          client={isEditing ? editingClient : undefined}
          onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit}
          onCancel={() => {
            setIsCreating(false);
            setIsEditing(false);
            setEditingClient(null);
          }}
        />
      )}

      {selectedClient && (
        <ClientDetails 
          client={selectedClient}
          onCancel ={() => {
            setSelectedClient(null);
          }}
        />
      )}


      {/* Search/Filter */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
      
      <ClientList 
        clients={clients}
        currentPage={currentPage}
        clientsPerPage={clientsPerPage}
        onEdit={handleEdit}
        onViewDetails={handleViewClient}
        onToggleActive={handleToggleActive}
        onPageChange={paginate}
      />


    </div>
  );
}