import React, { useContext, /* useState, */ createContext, useMemo, useEffect, useRef } from 'react';
import { useColorModeValue, useDisclosure } from '@chakra-ui/react';

export const Context = createContext({});

type ProviderProps = {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const loginInitialRef = React.useRef(null)
  const loginFinalRef = React.useRef(null)
  console.log(loginInitialRef, loginFinalRef)
  const signinInitialRef = React.useRef(null)
  const signinFinalRef = React.useRef(null)
  console.log(signinInitialRef, signinFinalRef)

  useEffect(() => {
    // Inicialização do Contexto
  }, []);

  const context = useMemo(() => (
    {
      // Estados:
      formBackground, 
      isOpen,
      loginInitialRef, 
      loginFinalRef, 
      signinInitialRef,
      signinFinalRef,
      onOpen, 
      onClose, 
      
        // Funções Operacionais:

    }
  ), 
    [
      // Observer
      formBackground, 
      isOpen, 
      loginInitialRef, 
      loginFinalRef, 
      signinInitialRef,
      signinFinalRef,
      onOpen, 
      onClose
    ]
  );

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

const GetContext = () => useContext(Context) as any;

export {
  Provider,
  GetContext,
};
