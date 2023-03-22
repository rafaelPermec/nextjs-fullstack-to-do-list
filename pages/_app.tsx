import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '@/frontend/Context/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider>
    <Provider>
      <Component {...pageProps} />
    </Provider>
  </ChakraProvider>
  )
}
