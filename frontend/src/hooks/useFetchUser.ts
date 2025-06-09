import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;
    
type User = {
    _id: string;
    name: string;
    email: string;
    wins: number;
    losses: number;
    profilePic: string;

}
export const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/user`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user from auth.");

      const data = await res.json();
      console.log(data);
      const userData = await fetch(`${API_URL}/users/${data.id}`);
      if (!userData.ok) throw new Error("Failed to fetch user.");
      const user = await userData.json();
      setUser(user);
    } catch (err: unknown) {
        if(err instanceof Error) {
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

  return {user, loading, error };
};
