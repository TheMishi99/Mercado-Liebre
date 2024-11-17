import Loader from "../../../components/Loader";
import UsersRegisterForm from "../../../components/web/users/UsersRegisterForm";
import useInterests from "../../../hooks/useInterests";

export default function UsersRegisterPage() {
  const [interestsLoading, interestsError, interests] = useInterests();
  return (
    <div
      id="users-register"
      className="w-full flex justify-center items-center p-2 gap-2"
    >
      <div
        id="register-form-container"
        className="w-full max-w-[400px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
      >
        {interestsLoading ? (
          <Loader />
        ) : interestsError ? (
          <p>{interestsError}</p>
        ) : (
          <>
            <h2 className="w-full font-bold text-center text-xl">Registro</h2>
            <UsersRegisterForm interests={interests} />
          </>
        )}
      </div>
    </div>
  );
}
