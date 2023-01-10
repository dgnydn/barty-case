import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import type { TUserServiceResponseWithUsers } from "../libs/types/service.type";
import type TUser from "../libs/types/user.type";

const fetcher = (url: string, params: RequestInit) =>
  fetch(url, params).then((r) => r.json());

const UsersTableComponent = ({ users }: { users: TUser[] }) => {
  return users.map((user: TUser) => (
    <tr className="border" key={user.id}>
      <td className="border">{user.name}</td>
      <td className="border">{user.surname}</td>
      <td className="border">{user.email}</td>
      <td className="border">{user.username}</td>
      <td className="border">{new Date(user.bornAt!).toLocaleDateString()}</td>
      <td className="border">{user.age}</td>
      <td className="border">
        {user.location.coordinates[0]},{user.location.coordinates[1]}
      </td>
      <td className="border">{user.phoneNumber}</td>
      <td className="border">{user.balance}</td>
      <td className="border">{user.about}</td>
      <td className="border">{user.image}</td>
    </tr>
  ));
};

export default function ListUsersComponent({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [data, setData] = useState<TUserServiceResponseWithUsers>();
  const { data: session } = useSession();

  useEffect(() => {
    session &&
      fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${session!.user.token}`,
        },
      })
        .then((r) => r.json())
        .then((r) => setData(r));
  }, [session]);

  if (!data) return <div>loading...</div>;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data!.users!.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data!.users!.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data!.users!.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <table className="table-fixed">
        <thead>
          <tr className="w-full border border-collapse">
            <th className="w-1/12 border">Name</th>
            <th className="w-1/12 border">Surname</th>
            <th className="w-1/12 border">Email</th>
            <th className="w-1/12 border">User name</th>
            <th className="w-1/12 border">Birthday</th>
            <th className="w-1/12 border">Age</th>
            <th className="w-1/12 border">Location</th>
            <th className="w-1/12 border">Phone number</th>
            <th className="w-1/12 border">Balance</th>
            <th className="w-1/12 border">About</th>
            <th className="w-1/12 border">Image</th>
            <th className="w-1/12 border">Actions</th>
          </tr>
        </thead>
        <tbody>{UsersTableComponent({ users: currentItems })}</tbody>
      </table>
      <ReactPaginate
        className="flex justify-center gap-4 p-4 font-bold text-white bg-blue-500"
        activeLinkClassName="bg-blue-800 rounded-full p-2"
        breakLabel={"..."}
        nextLabel={">"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"<"}
      />
    </>
  );
}
