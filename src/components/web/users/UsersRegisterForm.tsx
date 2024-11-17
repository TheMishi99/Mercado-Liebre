import { useRef, useState } from "react";
import { VITE_API_URL } from "../../../config/app.config";
import { InterestType } from "../../../typings/backend-types";

interface UsersRegisterFormProps {
  interests: InterestType[];
}
export default function UsersRegisterForm({
  interests,
}: UsersRegisterFormProps) {
  const [previewImage, setPreviewImage] = useState<string>(
    "images/usersAvatars/default.jpg"
  );
  const profile_image_ref = useRef(null);
  const full_name_ref = useRef(null);
  const email_ref = useRef(null);
  const birth_date_ref = useRef(null);
  const address_ref = useRef(null);
  const [profile, setProfile] = useState<string>("buyer");
  const [interestsSelected, setInterestsSelected] = useState<string[]>([]);
  const username_ref = useRef(null);
  const password_ref = useRef(null);
  const password_confirmation_ref = useRef(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profile_image_input = profile_image_ref.current! as HTMLInputElement;
    const full_name_input = full_name_ref.current! as HTMLInputElement;
    const email_input = email_ref.current! as HTMLInputElement;
    const birth_date_input = birth_date_ref.current! as HTMLInputElement;
    const address_input = address_ref.current! as HTMLInputElement;
    const username_input = username_ref.current! as HTMLInputElement;
    const password_input = password_ref.current! as HTMLInputElement;
    const password_confirmation_input =
      password_confirmation_ref.current! as HTMLInputElement;
    const profile_image = profile_image_input.files;
    const full_name = full_name_input.value;
    const email = email_input.value;
    const birth_date = birth_date_input.value;
    const address = address_input.value;
    const username = username_input.value;
    const password = password_input.value;
    const password_confirmation = password_confirmation_input.value;

    const formData = new FormData();
    if (profile_image) formData.append("profile_image", profile_image[0]);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("birth_date", birth_date);
    formData.append("address", address);
    formData.append("profile", profile);
    formData.append("interests", JSON.stringify(interestsSelected));
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
  };

  const handleProfileImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPreviewImage(URL.createObjectURL(event.target.files![0]));
  };

  const handleProfileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile(event.target.value);
  };

  const handleInterestInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (interestsSelected.includes(event.target.value)) {
      setInterestsSelected(
        interestsSelected.filter((int) => !int.includes(event.target.value))
      );
    } else {
      setInterestsSelected([...interestsSelected, event.target.value]);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full flex flex-col justify-center items-center p-2 gap-2"
    >
      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="profile_image" className="w-full text-start">
          Foto de Perfil
        </label>
        <img
          src={`${VITE_API_URL}/${previewImage}`}
          alt="Foto de Perfil"
          id="preview"
          className="w-2/3"
        />
        <input
          type="file"
          name="profile_image"
          id="profile_image"
          onChange={handleProfileImageInputChange}
          className="w-full"
          ref={profile_image_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="full_name" className="w-full text-start">
          Nombre Completo <span className="text-red-600">(*)</span>
        </label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          placeholder="Nombre y Apellido"
          className="w-full p-2 bg-white rounded-xl"
          ref={full_name_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="email" className="w-full text-start">
          Email <span className="text-red-600">(*)</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          className="w-full p-2 bg-white rounded-xl"
          ref={email_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="birth_date" className="w-full text-start">
          Fecha de Nacimiento <span className="text-red-600">(*)</span>
        </label>
        <input
          type="date"
          name="birth_date"
          id="birth_date"
          className="w-full p-2 bg-white rounded-xl"
          ref={birth_date_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="address" className="w-full text-start">
          Domicilio <span className="text-red-600">(*)</span>
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Domicilio"
          className="w-full p-2 bg-white rounded-xl"
          ref={address_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label className="w-full text-start">
          Perfil de Usuario <span className="text-red-600">(*)</span>
        </label>
        <div
          id="user-profiles-container"
          className="w-full flex flex-wrap justify-start items-center gap-4"
        >
          <div className="flex justify-center items-center gap-2">
            <input
              type="radio"
              name="profile"
              id="buyer"
              value="Comprador"
              checked={profile.includes("buyer")}
              onChange={handleProfileInputChange}
            />
            <label htmlFor="buyer">Comprador</label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input
              type="radio"
              name="profile"
              id="vendor"
              value="Vendedor"
              checked={profile.includes("vendor")}
              onChange={handleProfileInputChange}
            />
            <label htmlFor="vendor">Vendedor</label>
          </div>
        </div>
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label className="w-full text-start">Intereses</label>
        <div
          id="userInterest-container"
          className="w-full flex flex-wrap justify-start items-center gap-4"
        >
          {interests.map((interest) => (
            <div
              key={interest.id + interest.name}
              className="flex justify-center items-center gap-2"
            >
              <input
                type="checkbox"
                name="interests"
                id={interest.name.toLowerCase()}
                value={interest.name.toLowerCase()}
                onChange={handleInterestInputChange}
              />
              <label htmlFor={interest.name.toLowerCase()}>
                {interest.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="username" className="w-full text-start">
          Nombre de Usuario <span className="text-red-600">(*)</span>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de Usuario"
          className="w-full p-2 bg-white rounded-xl"
          ref={username_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="password" className="w-full text-start">
          Contraseña <span className="text-red-600">(*)</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          className="w-full p-2 bg-white rounded-xl"
          ref={password_ref}
          required
        />
      </div>

      <div className="input-group w-full flex flex-col justify-center items-center p-2 gap-2">
        <label htmlFor="password_confirmation" className="w-full text-start">
          Confirmar Contraseña <span className="text-red-600">(*)</span>
        </label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="Confirmar Contraseña"
          className="w-full p-2 bg-white rounded-xl"
          required
        />
      </div>

      <div className="flex justify-center items-center p-2 gap-2">
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
