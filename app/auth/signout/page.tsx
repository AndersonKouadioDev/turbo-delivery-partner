"use client";

import { signOut } from "@/auth";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    const performSignOut = async () => {
      await signOut({ redirectTo: "/auth" });
    };
    performSignOut();
  }, []);

  return <div>Déconnexion en cours...</div>;
}