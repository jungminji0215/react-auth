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

  // useEffect()는 브라우저가 화면(DOM)을 그린 뒤 실행
  useEffect(() => {
    const init = async () => {
      try {
        const { isLoggedIn, accessToken } = await authService.getSession();

        if (!isLoggedIn || !accessToken) {
          setToken(null);
          setUser(null);
          return;
        }

        setToken(accessToken);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!token) return;

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

  // useEffect 면 /api/me 에서 토큰 안 실림
  // 브라우저가 화면을 그리기 전에 먼저 이 인터셉터 등록이 끝남
  useLayoutEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => api.interceptors.request.eject(reqInterceptor);
  }, [token]);

  useEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && token) {
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
