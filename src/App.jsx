import { AuthProvider } from "./contexts/AuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import AppRoutes from "./Routes";

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </CitiesProvider>
  );
}
