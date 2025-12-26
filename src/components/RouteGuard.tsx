"use client";

import axios_instance from "@/config/axios";
import { useUserStore } from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define which routes need protection
const protectedRoutes = [
  "/",
  "/explore",
  "/messages",
  "/profile",
  "/notifications",
  "/search",
];

const unprotectedRoutes = ["/login", "/register", "/404", "/_not-found"];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!pathname) return;

    // Skip guard on public routes
    if (unprotectedRoutes.includes(pathname)) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("bearer_token");
    const needsAuth = protectedRoutes.some((route) => {
      if (pathname === "/") {
        const authToken = searchParams.get("authToken");
        if (authToken) {
          localStorage.setItem("bearer_token", authToken);
          window.history.replaceState({}, "", "/");
          //   axios_instance.get("/users/me").then((response) => {
          //     setUser(response.data.data);
          //   });
        } else return true;
      }
      if (route === "/") return false;
      else return pathname?.startsWith(route);
    });
    if (needsAuth && !token) {
      router.replace("/login");
      return;
    }
    axios_instance.get("/users/me").then((response) => {
      setUser(response.data.data);
      setLoading(false);
    });
  }, [pathname, router, searchParams, setUser]);

  if (loading) return null;

  return <>{children}</>;
}
