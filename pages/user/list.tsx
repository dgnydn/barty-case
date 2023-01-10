import ListUsersComponent from "../../components/listUsers.component";

export default function ListUsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <ListUsersComponent itemsPerPage={4} />
    </div>
  );
}
