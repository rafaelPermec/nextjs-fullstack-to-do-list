import { createContext, useEffect, useState } from 'react';
import { AuthDTO, LoginDTO, AuthContextDTO } from '../DTOS/login.dto';
import { setCookie, parseCookies } from 'nookies';
import { loginFetch } from '../Services/login.fetch';
import { useRouter } from 'next/router';

export const AuthContext = createContext({} as AuthContextDTO);

export function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState<AuthDTO | undefined>(undefined);
  const router = useRouter();
  const isAuthenticated = !!isAuth;

  const serverSideLogin = async (user: LoginDTO) => {
    const { data } = await loginFetch(user);
    setCookie(undefined, 'auth', JSON.stringify(data), {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setIsAuth(data);

    router.push('/todo-list');
    return data;
  }

  useEffect(() => {
    const { 'auth': auth } = parseCookies();
    if (auth) {
      setIsAuth(JSON.parse(auth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: isAuth, serverSideLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
