import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

export default function UsersLogoutPage() {
  const { logout } = useUserContext();
  const navigator = useNavigate();
  const handleLogoutButtonClick = async () => {
    await logout();
    navigator("/");
  };
  return (
    <div
      id="users-logout"
      className="w-full flex justify-center items-center p-2 gap-2"
    >
      <div
        id="logout-form-container"
        className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
      >
        <h2 className="w-full font-bold text-center text-xl">Logout</h2>
        <p>Estas seguro de que quieres cerrar sesion?</p>
        <div className="flex justify-center items-center p-2 gap-2">
          <Link to="/" className="p-2 bg-zinc-600 rounded-xl">
            Cancelar
          </Link>
          <button
            type="button"
            className="p-2 bg-red-500 rounded-xl"
            onClick={handleLogoutButtonClick}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
