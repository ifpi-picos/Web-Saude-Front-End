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
    } else if (decodedToken === "funcionario") {
      const allowedFuncionarioRoutes = ["/novo-usuario"];
      const currentPath = window.location.pathname;

      if (currentPath.startsWith("/dashboard/usuario/nova-senha/")) {
        setLoading(false);
        router.push("/login");
        return;
      } else if (allowedFuncionarioRoutes.includes(currentPath)) {
        router.push("/login");
        return;
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [decodedToken, router]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return children;
};
export default PrivateRoute;
