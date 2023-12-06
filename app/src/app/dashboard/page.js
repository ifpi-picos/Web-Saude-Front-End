"use client"
import "@/components/Admin/css/Dashboard.css";
import PrivateRoute from "@/components/Admin/privateRouter";
import Admin from "@/components/Admin/Admin";
export default function Dashboard() {
 
  return (
    <PrivateRoute>
      <Admin/>
    </PrivateRoute>
  );
}
