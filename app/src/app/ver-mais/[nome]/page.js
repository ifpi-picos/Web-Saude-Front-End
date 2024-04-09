import VerMais from "@/components/Usuarios/Ver-Mais/VerMais";
export const metadata = {
  title: `Ver-Mais`,
};

export default function pageVermais({ params }) {
  return <VerMais nome={params.nome} />;
}
