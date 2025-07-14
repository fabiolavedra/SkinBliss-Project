import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/index.jsx";
import LoginPage from "./pages/login.jsx";
import ShopPage from "./pages/shop.jsx";
import CartPage from "./pages/cart.jsx";
import ProductDetailsPage from "./pages/product-details/[id].jsx";
import ErrorPage from "./pages/404.jsx";
import ShopCategoryPage from "./pages/shop-category.jsx";
import ProfilePage from "./pages/profile.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import ShopRightSidebarPage from "./pages/shop-right-sidebar.jsx";
import AddCategoryPage from "./pages/add-category.jsx";
import SearchPage from "./pages/search.jsx";
import RegisterPage from "./pages/register.jsx";
import AddBrandPage from "./pages/add-brand.jsx";
import ManageBrandsPage from "./pages/manage-brands.jsx";
import ManageProductsPage from "./pages/manage-products.jsx";
import ManageCategoriesPage from "./pages/manage-categories.jsx";
import AddProductPage from "./pages/add-product.jsx";
import ForgotPage from "./pages/forgot.jsx";
import ManageUsersPage from "./pages/manage-users.jsx";
import ShopHiddenSidebarPage from "./pages/shop-hidden-sidebar.jsx";
import ManageOrdersPage from "./pages/manage-orders.jsx";
import EditCategoryPage from "./pages/edit-category/[id].jsx";
import EditBrandPage from "./pages/edit-brand/[id].jsx";
import EditProductPage from "./pages/edit-product/[id].jsx";
import OrderPage from "./pages/order/[id].jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/shop-category" element={<ShopCategoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop-right-sidebar" element={<ShopRightSidebarPage />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-brand" element={<AddBrandPage />} />
        <Route path="/manage-brands" element={<ManageBrandsPage />} />
        <Route path="/manage-products" element={<ManageProductsPage />} />
        <Route path="/manage-categories" element={<ManageCategoriesPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route
          path="/shop-hidden-sidebar"
          element={<ShopHiddenSidebarPage />}
        />
        <Route path="/manage-orders" element={<ManageOrdersPage />} />
        <Route path="/edit-category/:id" element={<EditCategoryPage />} />
        <Route path="/edit-brand/:id" element={<EditBrandPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
