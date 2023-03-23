import React, { useContext, useState, createContext, useMemo, useEffect, useRef } from 'react';
import { useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { parseCookies } from 'nookies';

export const Context = createContext({});

type ProviderProps = {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  // Event Hooks
  const [user, setUser] = useState({});
  const [todoUpdate, setTodoUpdate] = useState({});
  const [whichModal, setWhichModal] = useState('login' || 'signin' || 'update');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

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

  // Style Hooks
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginInitialRef = useRef(null)
  const loginFinalRef = useRef(null)
  const signinInitialRef = useRef(null)
  const signinFinalRef = useRef(null)
  const updateInitialRef = useRef(null)
  const updateFinalRef = useRef(null)
  
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
    if (!!value && value.length < 30) setRestrictionList((prevState: any) => ({ ...prevState, maxLength: true }));
    if (value.length >= 30) setRestrictionList((prevState: any) => ({ ...prevState, maxLength: false }));
  };

  const context = useMemo(() => (
    {
      // Estados:
      isLoading,
      formBackground, 
      isOpen,
      router,
      loginInitialRef, 
      loginFinalRef, 
      signinInitialRef,
      signinFinalRef,
      updateInitialRef,
      updateFinalRef,
      whichModal,
      user,
      todoUpdate,
      restrictionList,
      todoList,
      toggleColorMode,
      onOpen, 
      onClose, 
      // Funções Operacionais:
      setLoading,
      setWhichModal,
      handleInputChange,
      handlePassword,
      setUser,
      setTodoUpdate,
      setRestrictionList,
      ListValidator,
      setTodoList,
    }
  ), 
    [
      // Observer
      isLoading,
      formBackground,
      toggleColorMode,
      isOpen, 
      router,
      onOpen, 
      onClose,
      whichModal,
      user,
      todoUpdate,
      restrictionList,
      todoList,
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
