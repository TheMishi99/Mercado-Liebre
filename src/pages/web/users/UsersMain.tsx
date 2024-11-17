import Loader from "../../../components/Loader";
import UsersList from "../../../components/web/users/UsersList";
import { useUsersContext } from "../../../contexts/UsersContext";

export default function UsersMain() {
  const { usersLoading, usersError, users } = useUsersContext();
  return (
    <div
      id="users-main"
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      {usersLoading ? (
        <Loader />
      ) : usersError ? (
        <p>{usersError}</p>
      ) : (
        <>
          <h2 className="w-full flex text-start font-bold text-2xl">
            Todos los usuarios
          </h2>
          <UsersList users={users} />
        </>
      )}
    </div>
  );
}
