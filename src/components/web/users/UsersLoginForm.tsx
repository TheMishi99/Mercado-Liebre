import { useRef } from "react";

export default function UsersLoginForm() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = usernameRef.current! as HTMLInputElement;
    const passwordInput = passwordRef.current! as HTMLInputElement;
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(username, password);
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      <label htmlFor="username" className="w-full text-start">
        Nombre de Usuario
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nombre de Usuario"
        autoComplete="off"
        className="w-full p-2 bg-white rounded-xl"
        ref={usernameRef}
      />
      <label htmlFor="password" className="w-full text-start">
        Contraseña
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña"
        autoComplete="off"
        className="w-full p-2 bg-white rounded-xl"
        ref={passwordRef}
      />
      <div className="w-full flex justify-center items-center p-2 gap-2">
        <button type="reset" className="p-2 bg-zinc-400 rounded-xl">
          Borrar
        </button>
        <button type="submit" className="p-2 bg-yellow-400 rounded-xl">
          Enviar
        </button>
      </div>
    </form>
  );
}
