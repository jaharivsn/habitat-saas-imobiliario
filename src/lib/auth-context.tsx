"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "@/types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  title: string;
  agencyName?: string;
  creci?: string;
}

const MOCK_PROFILES: Record<UserRole, AuthUser | null> = {
  public: null,
  agent: {
    id: "agent-carlos-mendes",
    name: "Carlos Mendes",
    email: "carlos.mendes@habitatprivate.com.br",
    role: "agent",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    title: "Private Client Advisor",
    agencyName: "Habitat Prime Capital",
    creci: "189.420-F",
  },
  agency_owner: {
    id: "agency-sofia-alencastro",
    name: "Sofia Alencastro",
    email: "sofia@habitatboutique.com.br",
    role: "agency_owner",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    title: "Managing Partner & Founder",
    agencyName: "Alencastro Real Estate Partners",
    creci: "34.890-J",
  },
  platform_admin: {
    id: "admin-marcus-vance",
    name: "Marcus Vance",
    email: "governance@habitatplatform.com",
    role: "platform_admin",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "Platform Lead & Ecosystem Auditor",
  },
};

interface AuthContextType {
  role: UserRole;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: "public",
  user: null,
  isAuthenticated: false,
  setRole: () => {},
  loginAs: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("public");

  useEffect(() => {
    // Sync with localStorage or cookie on mount
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("habitat_role") as UserRole | null;
      if (storedRole && ["public", "agent", "agency_owner", "platform_admin"].includes(storedRole)) {
        setRoleState(storedRole);
        if (storedRole !== "public") {
          document.cookie = "habitat_session=demo; path=/; max-age=604800";
        }
      }
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("habitat_role", newRole);
      if (newRole === "public") {
        document.cookie = "habitat_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } else {
        document.cookie = "habitat_session=demo; path=/; max-age=604800";
      }
    }
  };

  const loginAs = (targetRole: UserRole) => {
    setRole(targetRole);
  };

  const logout = () => {
    setRole("public");
  };

  const user = MOCK_PROFILES[role];
  const isAuthenticated = role !== "public";

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        isAuthenticated,
        setRole,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
