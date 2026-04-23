import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

export function PrivateRoute({ children } : { children: JSX.Element}) {
  const { loading } = useAuth();

  if(loading) return <p>Loading...</p>;

  // if(!localStorage.user) return <Navigate to="/" replace/>;

  return children;
}