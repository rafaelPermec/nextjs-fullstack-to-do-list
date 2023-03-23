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
    setCookie(undefined, 'auth', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setCookie(undefined, 'user', JSON.stringify({
      id: data.id,
      name: data.name,
      email: data.email,
      auth: data.auth,
    }), {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setIsAuth(data);

    router.push('/todo-list');
  }

  useEffect(() => {
    const { 'auth': authSSR, 'user': userSSR } = parseCookies();
    const userSSRParse = JSON.parse(userSSR);
    const allCredentials = { ...userSSRParse,token: authSSR };
    if (authSSR) {
      setIsAuth(allCredentials && undefined);
    } 
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: isAuth, serverSideLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
