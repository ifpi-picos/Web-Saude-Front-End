import EspecialidadeForm from "@/components/Admin/Formularios/EspecialidadeForm";
import PrivateRoute from "@/components/Admin/privateRouter";

export default function especialidade() {
  return(
     <PrivateRoute>
     <EspecialidadeForm />
     </PrivateRoute>
  )
}
