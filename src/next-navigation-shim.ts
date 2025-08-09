import { useLocation } from "react-router-dom";

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export function redirect(href: string): never {
  window.location.assign(href);
  throw new Error("redirected");
}
