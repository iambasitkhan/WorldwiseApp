import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import HomePage from "../pages/Homepage";
// import Product from "../pages/Product";
// import Pricing from "../pages/Pricing";
// import Notfound from "../pages/Notfound";
// import Login from "../pages/Login";
// import AppLayout from "../pages/AppLayout";

const HomePage = lazy(() => import("../pages/Homepage"));
const Product = lazy(() => import("../pages/Product"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Notfound = lazy(() => import("../pages/Notfound"));
const Login = lazy(() => import("../pages/Login"));
const AppLayout = lazy(() => import("../pages/AppLayout"));

import CityList from "../components/CityList";
import City from "../components/City";
import CountryList from "../components/CountryList";
import Form from "../components/Form";
import SpinnerFullPage from "../components/SpinnerFullPage";
import ProtectedRoute from "../pages/ProtectedRoute";

// dist/index.html                   0.48 kB │ gzip:   0.32 kB
// dist/assets/index-XBvzI3pC.css   29.95 kB │ gzip:   5.05 kB
// dist/assets/index-CB6GCpSY.js   546.64 kB │ gzip: 163.28 kB

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
