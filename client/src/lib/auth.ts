import { apiRequest } from "./queryClient";

export interface User {
  id: string;
  username: string;
  email?: string | null;
}

let currentUser: User | null = null;

export async function login(username: string, password: string): Promise<User> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  const user = await response.json();
  currentUser = user;
  return user;
}

export async function register(username: string, password: string, email?: string): Promise<User> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  const user = await response.json();
  currentUser = user;
  return user;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  currentUser = null;
  window.location.href = '/';
}

export async function getCurrentUser(): Promise<User | null> {
  if (currentUser) {
    return currentUser;
  }

  try {
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    currentUser = user;
    return user;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return currentUser !== null;
}
