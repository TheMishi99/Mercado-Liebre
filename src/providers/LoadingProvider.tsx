import { ReactNode } from "react";
import { useInterests } from "../contexts/InterestsContext";
import { useUsers } from "../contexts/UsersContext";
import { useProducts } from "../contexts/ProductsContext";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export default function LoadingProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isLoading: isInterestsLoading } = useInterests();
  const { isLoading: isUsersLoading } = useUsers();
  const { isLoading: isProductsLoading } = useProducts();
  const { isLoading: isAuthLoading } = useAuth();
  if (
    isInterestsLoading ||
    isUsersLoading ||
    isProductsLoading ||
    isAuthLoading
  )
    return <Loader />;
  return children;
}
