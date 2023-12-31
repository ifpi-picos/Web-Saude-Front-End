"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import isTokenValid from "@/services/IsvalidToken";
import { useDecodedToken } from "@/services/decodeToken";
import Loading from "@/app/loading";
const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const decodedToken = useDecodedToken();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      setLoading(false);
      router.push("/login");
    } else {
      if (decodedToken === "funcionario") {
        const allowedFuncionarioRoutes = [
          "/dashboard",
          "/dashboard/unidades-de-saude",
        ];
        const currentPath = window.location.pathname;

        if (currentPath.startsWith("/dashboard/usuario/nova-senha/")) {
          setLoading(false);
          router.push("/login");
        } else if (allowedFuncionarioRoutes.includes(currentPath)) {
          setLoading(false);
          router.push("/login");
        }
      } else if (decodedToken === "admin") {
        const allowedAdminRoutes = ["/funcionario"];
        const currentPath = window.location.pathname;

        if (allowedAdminRoutes.includes(currentPath)) {
          setLoading(false);
          router.push("/login");
        }
      } else {
        setLoading(false);
      }
    }
  }, [decodedToken, router]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
