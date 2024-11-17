import UsersLoginForm from "../../../components/web/users/UsersLoginForm";

export default function UsersLoginPage() {
  return (
    <div
      id="users-login"
      className="w-full flex justify-center items-center p-2 gap-2"
    >
      <div
        id="login-form-container"
        className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
      >
        <h2 className="w-full font-bold text-center text-xl">Login</h2>
        <UsersLoginForm />
      </div>
    </div>
  );
}
