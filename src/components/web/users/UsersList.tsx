import { UserType } from "../../../typings/backend-types";
import UserCard from "./UserCard";

interface UsersListProps {
  users: UserType[];
}
export default function UsersList({ users }: UsersListProps) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-2 gap-2">
      {users.map((user) => (
        <li
          key={user.id + user.username}
          className="flex justify-center items-center p-2 gap-2"
        >
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}
