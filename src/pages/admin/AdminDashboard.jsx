import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <main className="overflow-hidden">
      <section className="bg-cream pt-36 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-berry font-medium mb-3"
          >
            Admin Dashboard
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-teal mb-10"
          >
            Welcome back, {user?.name?.split(" ")[0] || "Admin"}
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
