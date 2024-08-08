import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const FAKE_USER = {
  name: "Basit khan",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...initialState };
  }
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(username, password) {
    if (username === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
