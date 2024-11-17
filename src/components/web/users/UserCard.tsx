import { Link } from "react-router-dom";
import { VITE_API_URL } from "../../../config/app.config";
import { UserType } from "../../../typings/backend-types";

interface UserCardProps {
  user: UserType;
}
export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/users/${user.id}`}
      id="user-card"
      className="w-full flex flex-col justify-center items-center p-2 gap-2 bg-zinc-300 rounded-xl"
    >
      <div
        id="user-img"
        className="w-full flex justify-center items-cente p-2 gap-2"
      >
        <img
          src={`${VITE_API_URL}/${user.profile_image}`}
          alt={`${user.username}-profile-image`}
          className="aspect-square rounded-full"
        />
      </div>
      <div
        id="user-info"
        className="w-full flex justify-center items-center p-2 gap-2"
      >
        <p className="w-full text-center">{user.username}</p>
      </div>
    </Link>
  );
}
