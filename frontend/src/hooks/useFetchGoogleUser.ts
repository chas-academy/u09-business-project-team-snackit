import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

type User = {
  name: {
    givenName: string;
  }
  id: string;
  _json: {
    email: string;
  }
};

export const useFetchGoogleUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/user`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user from auth");
      

      const data = await res.json();
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
};
