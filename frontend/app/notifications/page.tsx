"use client";

import { useEffect } from "react";
import { getToken } from "@/lib/auth";

export default function NotificationsPage() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-xl font-bold mb-2">Notifications</h1>
        <p className="text-gray-600">หน้านี้ยังเป็น placeholder</p>
      </div>
    </main>
  );
}
