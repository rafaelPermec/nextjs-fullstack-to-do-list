import React, { useContext } from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import { loginFetch, authFetch } from '@/frontend/Services';
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

export default function LoginModal() {
    const { 
      isOpen, 
      onClose, 
      loginFinalRef, 
      loginInitialRef, 
      handleInputChange,
      handlePassword,
      setLogin,
      login,
      ListValidator,
    } = GetContext();
    const { serverSideLogin } = useContext(AuthContext);

    const toast = useToast();

    const handleLogin = async (e: any) => {
      e.preventDefault();
  
      try {
        const loginRequest: any = await serverSideLogin(login)
        console.log(loginRequest)
        if (loginRequest.auth) {
          localStorage.setItem('user', JSON.stringify({ 
            id: loginRequest.id, 
            name: loginRequest.name, 
            email : loginRequest.email,
          }));
          onClose();
          toast({
            title: `Olá, ${loginRequest.name}`,
            description: 'Seja bem-vindo!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro no Login',
            description: 'Usuário não autorizado.',
            status: 'error',
            duration: 2000,
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
              <FormControl id="login_user">
                <FormLabel>E-mail:</FormLabel>
                <Input 
                  ref={loginInitialRef} 
                  placeholder='E-mail'
                  name="email"
                  type="email" 
                  borderColor="gray.300"
                  onChange={(e) => handleInputChange(e, setLogin)}
                />
              </FormControl>
  
              <FormControl mt={4} id="login_user">
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
                    handleInputChange(e, setLogin);
                  }}
                />
              </FormControl>
              <PasswordValidation />
            </ModalBody>
  
            <ModalFooter>
            <FormControl id="login_user">
              <Button colorScheme='teal' mr={3} type="submit" onClick={(e) => handleLogin(e)}>
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
