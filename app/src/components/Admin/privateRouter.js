// components/PrivateRoute.js
import { useSession } from "next-auth/react";

export default function PrivateRoute({ children }) {
  const { data: session } = useSession();

  if (!session) {
    // Redirecionar para a página de login
    window.location.href = "/login"; // Certifique-se de que o caminho está correto
    return null;
  }

  return children;
}
