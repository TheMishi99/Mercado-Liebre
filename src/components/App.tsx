import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/web/HomePage";
import CreateProduct from "../pages/web/products/CreateProduct";
import ProductsPage from "../pages/web/products/ProductsPage";
import ProductDetail from "../pages/web/products/ProductDetail";
import Dashboard from "../pages/Dashboard";
import Web from "../pages/Web";
import NotFoundPage from "../pages/web/NotFoundPage";
import AboutPage from "../pages/web/AboutPage";
import UsersPage from "../pages/web/users/UsersPage";
import UsersLoginPage from "../pages/web/users/UsersLoginPage";
import UsersRegisterPage from "../pages/web/users/UsersRegisterPage";
import UserProvider from "../contexts/UserContext";
import DashboardHomePage from "../pages/dashboard/DashboardHomePage";
import DashboardProductsPage from "../pages/dashboard/products/DashboardProductsPage";
import UserDetailPage from "../pages/web/users/UsersDetail";
import ProductsMain from "../pages/web/products/ProductsMain";
import UsersMain from "../pages/web/users/UsersMain";
import ProductsCart from "../pages/web/products/ProductsCart";
import ProductsProvider from "../contexts/ProductsContext";
import UsersProvider from "../contexts/UsersContext";
import SearchProducts from "../pages/web/products/SearchProducts";

export default function App() {
  return (
    <div
      id="app"
      className="w-full flex flex-col justify-center items-center bg-white text-black"
    >
      <ProductsProvider>
        <UsersProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Web />}>
                <Route path="" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="products" element={<ProductsPage />}>
                  <Route path="" element={<ProductsMain />} />
                  <Route path="create" element={<CreateProduct />} />
                  <Route path="cart" element={<ProductsCart />} />
                  <Route path="search" element={<SearchProducts />} />
                  <Route path=":id" element={<ProductDetail />} />
                </Route>
                <Route path="users" element={<UsersPage />}>
                  <Route path="" element={<UsersMain />} />
                  <Route path="login" element={<UsersLoginPage />} />
                  <Route path="register" element={<UsersRegisterPage />} />
                  <Route path=":id" element={<UserDetailPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<DashboardHomePage />} />
                <Route path="products" element={<DashboardProductsPage />} />
              </Route>
            </Routes>
          </UserProvider>
        </UsersProvider>
      </ProductsProvider>
    </div>
  );
}
