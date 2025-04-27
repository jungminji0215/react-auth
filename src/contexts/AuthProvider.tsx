import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import api from '../api/axios.ts';
import { authService } from '../services/authService.ts';
import * as React from 'react';

type AuthContextType = {
  token: string | null | undefined;
  user: string | null | undefined;
  isLoading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>(); // 아직 토큰을 가져오지 않았음을 의미
  const [user, setUser] = useState<string | null | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('로그인 했는지 확인할게요');
    const initToken = async () => {
      try {
        const { accessToken } = await authService.refreshAccessToken();
        setToken(accessToken);
      } catch {
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initToken();
  }, []);

  useEffect(() => {
    if (!token) return;
    console.log('로그인 했군요, 유저 정보 가져올게요');

    const fetchUser = async () => {
      try {
        const { user } = await authService.getMe();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [token]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403) {
          try {
            const response = await authService.refreshAccessToken();

            setToken(response.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};
