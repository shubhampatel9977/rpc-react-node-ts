import { useState } from "react";

import { trpc } from "../trpc/client";

function UserCrud() {
  const { data: users, refetch } = trpc.user.list.useQuery();

  const createUser = trpc.user.create.useMutation({ onSuccess: () => refetch() });
  const updateUser = trpc.user.update.useMutation({ onSuccess: () => refetch() });
  const deleteUser = trpc.user.delete.useMutation({ onSuccess: () => refetch() });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>User CRUD</h1>

      {/* CREATE FORM */}
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => createUser.mutate({ name, email })}>
        Add User
      </button>

      <hr />

      {/* USER LIST */}
      {users?.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email}

          <button onClick={() => updateUser.mutate({ id: u.id, name: "Updated" })}>
            Update
          </button>

          <button onClick={() => deleteUser.mutate({ id: u.id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCrud;
