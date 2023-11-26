import NovaSenhaForm from "@/components/Admin/Formularios/NovaSenhaForm";

export default function NovaSenha({ params }) {
  return <NovaSenhaForm nome={params.nome} />;
}
