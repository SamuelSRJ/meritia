import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  picture?: string;
  accessToken: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if(data) {
      setUser(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  async function signInWithGoogle() {
    setLoading(true);

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "openid profile email",
        callback: async (response: any) => {
          if(!response || !response.access_token) {
            console.error("No access token returned");
            setLoading(false);
            return;
          }
          const accessToken = response.access_token;

          const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });

          const userInfo = await res.json()

          const userData: User = {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            accessToken,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setLoading(false);
        },
      });

      tokenClient.requestAccessToken();
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}