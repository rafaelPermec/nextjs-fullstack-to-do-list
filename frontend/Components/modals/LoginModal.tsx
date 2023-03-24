import React, { useContext } from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import { PasswordValidation } from '../';
import { 
  Button, 
  Modal,
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton,
  FormControl, 
  FormLabel, 
  Input,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '@/frontend/Context/AuthContext';
import { parseCookies } from 'nookies';

export default function LoginModal() {
    const { 
      isOpen, 
      onClose, 
      loginFinalRef, 
      loginInitialRef, 
      handleInputChange,
      handlePassword,
      setUser,
      user,
      ListValidator,
    } = GetContext();
    const { serverSideLogin } = useContext(AuthContext);

    const toast = useToast();

    const handleLogin = async (e: any) => {
      e.preventDefault();
      
      try {
        await serverSideLogin({ email: user.email, password: user.password });
        const { 'auth': authSSR, 'user': userSSR } = parseCookies();
        const userSSRParse = JSON.parse(userSSR);
        if (authSSR) {
          onClose();
          toast({
            title: `Olá, ${userSSRParse.name}`,
            description: 'Seja bem-vindo!',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          toast({
            title: `Sua sessão expira em:`,
            description: 'Uma hora!',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro no Login',
            description: 'Usuário não autorizado.',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        toast({
          title: 'Erro no Login',
          description: error.response.data.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }

    return (
        <Modal
          initialFocusRef={loginInitialRef}
          finalFocusRef={loginFinalRef}
          isOpen={isOpen}
          onClose={onClose}
          size='2xl'
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader margin='0 auto' fontSize='4xl'>
              Login
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl id="user_login">
                <FormLabel>E-mail:</FormLabel>
                <Input 
                  ref={loginInitialRef} 
                  placeholder='E-mail'
                  name="email"
                  type="email" 
                  borderColor="gray.300"
                  onChange={(e) => handleInputChange(e, setUser)}
                />
              </FormControl>
  
              <FormControl mt={4} id="user_login">
                <FormLabel>Senha</FormLabel>
                <Input 
                  placeholder='Senha' 
                  type="password"
                  name="password"
                  borderColor="gray.300"
                  maxLength={30}
                  onChange={(e) => {
                    ListValidator(e);
                    handlePassword(e);
                    handleInputChange(e, setUser);
                  }}
                />
              </FormControl>
              <PasswordValidation />
            </ModalBody>
  
            <ModalFooter>
            <FormControl id="user_login">
              <Button colorScheme='teal' mr={3} type="submit" onClick={(e) => {handleLogin(e); setUser({});}}>
                Bem-Vindo!
              </Button>
            </FormControl>
              <Button 
                onClick={onClose} 
                colorScheme='teal' 
                variant='outline' 
              >
                Voltar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}
