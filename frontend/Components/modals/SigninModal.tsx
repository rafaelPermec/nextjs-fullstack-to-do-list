import React from 'react';
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
  useToast
} from '@chakra-ui/react';
import { GetContext } from '@/frontend/Context/Provider';
import PasswordValidation from '../PasswordValidation';
import { createUserFetch } from '@/frontend/Services/user.fetch';

export default function SigninModal() {
  const { 
    isOpen, 
    onClose, 
    signinFinalRef, 
    signinInitialRef, 
    handleInputChange,
    handlePassword,
    setUser,
    user,
    ListValidator,
  } = GetContext();
  const toast = useToast(); 

  const handleCreateUser = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await createUserFetch({ name: user.name, email: user.email, password: user.password });
      if (data) {
        onClose();
        toast({
          id: 'success-signin',
          title: 'Bem vindo!',
          description: 'Agora faça seu login!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Algo aconteceu!',
          description: 'Por favor, ente novamente.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        id: 'error-signin',
        title: 'Erro ao criar usuário.',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }
  
    return (
      <section>
          <Modal
            initialFocusRef={signinInitialRef}
            finalFocusRef={signinFinalRef}
            isOpen={isOpen}
            onClose={onClose}
            size='2xl'
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader margin='0 auto' fontSize='4xl'>
                Crie sua conta
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                
                <FormControl id="create_new_user">
                  <FormLabel htmlFor='name' >Seu nome:</FormLabel>
                  <Input
                    id='name'
                    data-cy='signin-input-name'
                    ref={signinInitialRef}
                    placeholder='Nome'
                    name="name"
                    borderColor="gray.300"
                    onChange={(e) => handleInputChange(e, setUser)} 
                  />
                </FormControl>
    
                <FormControl mt={4} id="create_new_user">
                    <FormLabel htmlFor='email' >E-mail:</FormLabel>
                    <Input 
                      id='email'
                      data-cy='signin-input-email'
                      placeholder='Email' 
                      type='email'
                      name="email"
                      borderColor="gray.300"
                      onChange={(e) => handleInputChange(e, setUser)}
                    />
                  </FormControl>

                <FormControl mt={4} id="create_new_user">
                    <FormLabel htmlFor='password'>Senha:</FormLabel>
                    <Input 
                      id='password'
                      data-cy='signin-input-password'
                      placeholder='Senha' 
                      type='password'
                      name="password" 
                      maxLength={30}
                      borderColor="gray.300"
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
                  <FormControl id="create_new_user">
                  <Button 
                    data-cy='signin-create-button'
                    colorScheme='teal' 
                    mr={3} 
                    type="submit" 
                    onClick={(e) => {handleCreateUser(e);}}
                  >
                    Criar Usuário
                  </Button>
                </FormControl>
                <Button
                  data-cy='signin-button-back'
                  onClick={onClose} 
                  colorScheme='teal' 
                  variant='outline'
                >
                  Voltar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </section>
    )
}
