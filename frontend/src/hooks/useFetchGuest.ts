import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.NODE_ENV === "prod"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

type Guest = {
  _id: string;
  name: string;
  email: string;
  wins: number;
  losses: number;
  profilePic: string;
  lives: string;
};
export const useFetchGuest = () => {
  const [guest, setGuest] = useState<Guest | null>(null);
    const [loadingGuest, setLoadingGuest] = useState(true);
    const [errorGuest, setErrorGuest] = useState<Error | null>(null);

  const fetchGuest = async () => {
    try {
      const res = await fetch(`${API_URL}/users/683d9a05a9cbce37c219c55b`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch guest");
      const data = await res.json();
    //   console.log(data);
      setGuest(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setErrorGuest(err);
      }
    } finally {
        setLoadingGuest(false);
    }
  };
  useEffect(() => {
    fetchGuest();
  },[])
  return {guest, loadingGuest, errorGuest}
};
