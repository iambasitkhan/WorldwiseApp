import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/Homepage";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
import Notfound from "../pages/Notfound";
import Login from "../pages/Login";
import AppLayout from "../pages/AppLayout";
import CityList from "../components/CityList";
import City from "../components/City";
import CountryList from "../components/CountryList";
import Form from "../components/Form";
import ProtectedRoute from "../pages/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
