"use client";

import DashboardMain from "@/components/admin/DashboardMain";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user.isAdmin) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="">
      <div className="flex-1 flex flex-col">
        <DashboardMain />
      </div>
    </div>
  );
};

export default AdminDashboard;


