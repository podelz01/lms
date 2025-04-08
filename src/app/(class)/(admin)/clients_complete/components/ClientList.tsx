"use client";

import styles from "./../styles/Clients.module.css";

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

interface ClientListProps {
  clients: Client[];
  currentPage: number;
  clientsPerPage: number;
  onEdit: (client: Client) => void;
  onToggleActive: (clientId: number) => void;
  onPageChange: (pageNumber: number) => void;
  onViewPIC: (clientId: number) => void; 
  onViewDetails: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  currentPage,
  clientsPerPage,
  onEdit,
  onToggleActive,
  onPageChange,
  onViewPIC,
  onViewDetails,
}) => {
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.clientTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id} data-active={client.active}>
                <td onClick={() => onViewDetails(client)}>{client.name}</td>
                <td>
                  <button onClick={() => onEdit(client)}>Edit</button>
                  <button onClick={() => onViewPIC(client.id)}>List of PIC</button>
                  <button onClick={() => onToggleActive(client.id)}>
                    Set {client.active ? "Non-active" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(clients.length / clientsPerPage) },
          (_, i) => (
            <button key={i + 1} onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default ClientList;