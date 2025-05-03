import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { VITE_API_URL } from "../../../config/app.config";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserProfilePage() {
  const { userLogged, isError, isLoading } = useAuth();
  return (
    <div
      id="user-detail"
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>{isError}</p>
      ) : (
        userLogged && (
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
                  src={`${VITE_API_URL}/${userLogged.profile_image}`}
                  alt="Foto de Perfil"
                  className="w-full rounded-xl"
                />
              </div>
              <div
                id="user-info"
                className="w-full flex flex-col justify-center items-center p-2 gap-2"
              >
                <p className="w-full text-start">
                  <strong>Nombre Completo:</strong> {userLogged.full_name}
                </p>
                <p className="w-full text-start">
                  <strong>Email:</strong> {userLogged.email}
                </p>
                <p className="w-full text-start">
                  <strong>Fecha de Nacimiento:</strong> {userLogged.birth_date}
                </p>
                <p className="w-full text-start">
                  <strong>Domicilio:</strong> {userLogged.address}
                </p>
                <p className="w-full text-start">
                  <strong>Perfil:</strong> {userLogged.profile}
                </p>
                {userLogged.interests.length === 0 ? (
                  <p className="w-full text-start">
                    <strong>Intereses:</strong> Ninguno
                  </p>
                ) : (
                  <p className="w-full text-start">
                    <strong>Intereses:</strong>{" "}
                    {userLogged.interests.map((int) => int.name).join(", ")}
                  </p>
                )}
                <p className="w-full text-start">
                  <strong>Nombre de usuario:</strong> {userLogged.username}
                </p>
                <div
                  id="user-ops"
                  className="w-full flex justify-center items-center p-2 gap-2"
                >
                  <Link
                    to={`/users/${userLogged.id}/edit`}
                    id="edit-button"
                    className="p-2 bg-yellow-400 rounded-xl"
                  >
                    Editar
                  </Link>
                  <Link
                    to="/users"
                    id="go-back-button"
                    className="p-2 bg-zinc-400 rounded-xl"
                  >
                    Volver atras
                  </Link>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
