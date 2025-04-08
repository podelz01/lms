"use client";

import styles from "./../styles/Clients.module.css";

interface Client {
  id?: number;
  name: string;
  address: string;
  phone: string;
  taxId?: string;
  active: boolean;
}

interface ClientFormProps {
  client?: Client;
  onSubmit: (client: Client) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!client;

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? "Edit Client" : "Create Client"}</h2>
      <form
        onSubmit={(e) =>
          onSubmit({
            id: isEditing ? client!.id : undefined,
            name: e.currentTarget.name.value,
            address: e.currentTarget.address.value,
            phone: e.currentTarget.phone.value,
            taxId: e.currentTarget.taxId.value,
            active: isEditing ? client!.active : true,
          })
        }
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            defaultValue={isEditing ? client!.name : ""}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            defaultValue={isEditing ? client!.address : ""}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            defaultValue={isEditing ? client!.phone : ""}
          />
        </div>
        <div>
          <label htmlFor="taxId">Tax ID:</label>
          <input
            type="text"
            id="taxId"
            defaultValue={isEditing ? client!.taxId ?? "" : ""}
          />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ClientForm;