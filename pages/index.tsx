/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { TopMenu, LoginModal, SigninModal } from '@/frontend/Components';
import { 
  Text, 
  Flex, 
  Button,
} from '@chakra-ui/react';
import { PlusSquareIcon, BellIcon } from '@chakra-ui/icons';
import { GetContext } from '@/frontend/Context/Provider';


export default function Page() {
  const { 
    formBackground, 
    onOpen, 
    loginFinalRef, 
    signinFinalRef,
    whichModal,
    setWhichModal,
    megrimFont,
  } = GetContext();

  const handleLogin = () => {
    onOpen();
    setWhichModal('login');
  }

  const handleSignin = () => {
    onOpen();
    setWhichModal('signin');
  }

  return (
    <main>
      <TopMenu />
      <Flex 
        height="80vh" 
        alignItems="center" 
        justifyContent="center" 
      >
        <Flex 
          direction="column" 
          background={formBackground} 
          p={12} 
          rounded={6} 
          boxShadow="dark-lg"
        >
          <Text
            className={megrimFont.className}
            fontSize='7xl' 
            mb={6}
            color='teal.500'
          >
            ParaTo-Do's
          </Text>
            <Button 
            colorScheme="teal" 
            variant="outline" 
            mb={22} 
            mt={22}
            leftIcon={<BellIcon />}
            ref={loginFinalRef}
            onClick={handleSignin}
            >
              Cadastre-se
            </Button>
            <Button 
              colorScheme="teal"
              leftIcon={<PlusSquareIcon />}
              ref={signinFinalRef}
              onClick={handleLogin}
            >
              Login
            </Button>
            {
              whichModal === 'login' ? <LoginModal /> : <SigninModal />
            }
        </Flex>
        
      </Flex>
    </main>
  )
}
