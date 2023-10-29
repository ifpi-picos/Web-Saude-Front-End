"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Importe useRouter corretamente
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { data: session } = useSession();
  const router = useRouter(); // Instancie o router aqui

  useEffect(() => {
    if (!session) {
      // Redirecionar para a página de login
      router.push("/login"); // Certifique-se de que o caminho está correto
    }
  }, [session, router]);

  if (!session) {
    // Não retorne nada enquanto a verificação estiver acontecendo
    return null;
  }

  return children;
}

