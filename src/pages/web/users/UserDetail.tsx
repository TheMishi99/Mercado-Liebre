import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { VITE_API_URL } from "../../../config/app.config";
import { useUsers } from "../../../contexts/UsersContext";
import { useMemo } from "react";

export default function UserDetailPage() {
  const { id } = useParams();
  const {
    isLoading: usersLoading,
    isError: usersError,
    users,
  } = useUsers();
  const userFound = useMemo(
    () => users.find((user) => user.id === Number(id)),
    [users, id]
  );

  return (
    <div
      id="user-detail"
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      {usersLoading ? (
        <Loader />
      ) : usersError ? (
        <p>{usersError}</p>
      ) : (
        userFound && (
          <>
            <h2 className="w-full font-bold text-start text-xl">
              Detalle de Usuario
            </h2>
            <div
              id="user-container"
              className="w-full grid grid-cols-2 p-2 gap-2"
            >
              <div
                id="user-img"
                className="w-full flex justify-center items-center"
              >
                <img
                  src={`${VITE_API_URL}/${userFound.profile_image}`}
                  alt="Foto de Perfil"
                  className="w-full rounded-xl"
                />
              </div>
              <div
                id="user-info"
                className="w-full flex flex-col justify-center items-center p-2 gap-2"
              >
                <p className="w-full text-start">
                  <strong>Nombre Completo:</strong> {userFound.full_name}
                </p>
                <p className="w-full text-start">
                  <strong>Email:</strong> {userFound.email}
                </p>
                <p className="w-full text-start">
                  <strong>Fecha de Nacimiento:</strong> {userFound.birth_date}
                </p>
                <p className="w-full text-start">
                  <strong>Domicilio:</strong> {userFound.address}
                </p>
                <p className="w-full text-start">
                  <strong>Perfil:</strong> {userFound.profile}
                </p>
                {userFound.interests.length === 0 ? (
                  <p className="w-full text-start">
                    <strong>Intereses:</strong> Ninguno
                  </p>
                ) : (
                  <p className="w-full text-start">
                    <strong>Intereses:</strong>{" "}
                    {userFound.interests.map((int) => int.name).join(", ")}
                  </p>
                )}
                <p className="w-full text-start">
                  <strong>Nombre de usuario:</strong> {userFound.username}
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
