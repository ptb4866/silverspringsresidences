import { useNavigate, useLocation } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  return {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    pathname: location.pathname,
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export function redirect(href) {
  // noop in client land; use navigate instead inside components
  console.warn(
    "redirect() called: use useRouter().replace in components instead",
    href
  );
}
