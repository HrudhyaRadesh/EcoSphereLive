export interface User {
  email: string;
  username: string;
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('carbonData');
  localStorage.removeItem('carbonDataDate');
  window.location.href = '/';
}

export function setUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}
