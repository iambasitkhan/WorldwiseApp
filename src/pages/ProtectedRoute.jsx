import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}
