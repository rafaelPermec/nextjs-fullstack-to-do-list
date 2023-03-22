import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '@/frontend/Context/Provider';
import { AuthProvider } from '@/frontend/Context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider>
    <Provider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  </ChakraProvider>
  )
}
