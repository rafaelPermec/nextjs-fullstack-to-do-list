import React from 'react';
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
} from '@chakra-ui/react';

export default function LoginModal() {
    const { 
      isOpen, 
      onClose, 
      loginFinalRef, 
      loginInitialRef, 
      handleInputChange,
      setUser,
      ListValidator,
    } = GetContext();

    const handlePassword = ({ target: { value } }: any) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      const passwordTest = passwordRegex.test(value);
      if (passwordTest) {
        setUser((prevState: any) => ({ ...prevState, password: value }));
      } else {
        setUser((prevState: any) => ({ ...prevState, password: '' }));
      }
    };

  
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
              <FormControl>
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
  
              <FormControl mt={4}>
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
              <Button colorScheme='teal' mr={3}>
                Bem-Vindo!
              </Button>
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
