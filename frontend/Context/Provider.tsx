import React, { useContext, useState, createContext, useMemo, useEffect, useRef } from 'react';
import { useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const Context = createContext({});

type ProviderProps = {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [whichModal, setWhichModal] = useState('login' || 'signin' || 'update');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [restrictionList, setRestrictionList] = useState({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    minLength: false,
    maxLength: false,
  });

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter();

  const loginInitialRef = useRef(null)
  const loginFinalRef = useRef(null)
  const signinInitialRef = useRef(null)
  const signinFinalRef = useRef(null)
  const updateInitialRef = useRef(null)
  const updateFinalRef = useRef(null)
 

  useEffect(() => {
    // Inicialização do Contexto
  }, []);

  const handleInputChange = ({ target: { name, value } }: any, functionSetter: (param: any) => void) => functionSetter((prevState: any) => ({ ...prevState, [name]: value }));

  const handlePassword = ({ target: { value } }: any) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordTest = passwordRegex.test(value);
    if (passwordTest) {
      setUser((prevState: any) => ({ ...prevState, password: value }));
    } else {
      setUser((prevState: any) => ({ ...prevState, password: '' }));
    }
  };
  
  const ListValidator = ({ target: { value } }: any) => {
    const upperCase = /(?=.*?[A-Z])/;
    const lowerCase = /(?=.*?[a-z])/;
    const number = /(?=.*?[0-9])/;
    const specialChar = /(?=.*?[#?!@$%^&*-])/;
    
    if (upperCase.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, upperCase: true }));
    if (!upperCase.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, upperCase: false }));
    if (lowerCase.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, lowerCase: true }));
    if (!lowerCase.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, lowerCase: false }));
    if (number.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, number: true }));
    if (!number.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, number: false }));
    if (specialChar.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, specialChar: true }));
    if (!specialChar.test(value)) setRestrictionList((prevState: any) => ({ ...prevState, specialChar: false }));
    if (value && value.length >= 8) setRestrictionList((prevState: any) => ({ ...prevState, minLength: true }));
    if (!value || value.length < 8) setRestrictionList((prevState: any) => ({ ...prevState, minLength: false }));
    if (value && value.length < 30) setRestrictionList((prevState: any) => ({ ...prevState, maxLength: true }));
    if (!value || value.length > 30) setRestrictionList((prevState: any) => ({ ...prevState, maxLength: false }));
  };

  const context = useMemo(() => (
    {
      // Estados:
      formBackground, 
      toggleColorMode,
      isOpen,
      router,
      loginInitialRef, 
      loginFinalRef, 
      signinInitialRef,
      signinFinalRef,
      updateInitialRef,
      updateFinalRef,
      onOpen, 
      onClose, 
      whichModal,
      user,
      restrictionList,
      // Funções Operacionais:
      setWhichModal,
      handleInputChange,
      handlePassword,
      setUser,
      setRestrictionList,
      ListValidator,
    }
  ), 
    [
      // Observer
      formBackground,
      toggleColorMode,
      isOpen, 
      router,
      onOpen, 
      onClose,
      whichModal,
      user,
      restrictionList,
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
