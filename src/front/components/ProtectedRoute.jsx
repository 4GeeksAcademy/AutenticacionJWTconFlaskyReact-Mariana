import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { store, dispatch } = useGlobalReducer();

  const tokenFromStorage = sessionStorage.getItem("token");
  const token = store?.token ?? tokenFromStorage;

  if (!store?.token && tokenFromStorage) {
    dispatch({ type: "SET_TOKEN", payload: tokenFromStorage });
  }

  if (!token) return <Navigate to="/login" replace />;

  return children;
};
