import "@/components/Admin/css/Dashboard.css";
import PrivateRoute from "@/components/Admin/privateRouter";
import Admin from "@/components/Admin/Admin";

export const metadata = {
  title: "Admin",
};
export default function PainelAdmin() {
  return (
    <PrivateRoute>
      <Admin />
    </PrivateRoute>
  );
}
