"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="flex-col flex grow w-full bg-white">
        {children}
      </div>
    </ProtectedRoute>
  );
}
