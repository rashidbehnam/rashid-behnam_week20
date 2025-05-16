import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import { useMemo } from "react";

export default function useProfile() {
  const token = cookies.get("jwt-token");

  const user = useMemo(() => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        cookies.remove("jwt-token");
        return null;
      }

      return decoded;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }, [token]);

  return { user };
}
