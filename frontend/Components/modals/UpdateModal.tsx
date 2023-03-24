import React from 'react';
import { destroyCookie, parseCookies } from 'nookies';
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
import { patchUserFetch } from '@/frontend/Services/user.fetch';

export default function UpdateModal() {
  const { 
    router,
    isOpen, 
    onClose, 
    updateFinalRef,
    updateInitialRef,
    handleInputChange,
    handlePassword,
    setUser,
    ListValidator,
  } = GetContext();

  const toast = useToast()

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    setUser({});

    try {
      // const { 'user': user } = parseCookies();
      // const getUser = JSON.parse(user);
      // const dataRequest = await patchUserFetch(getUser.id, getUser);
      // if (dataRequest.status === 200) {
      //   onClose();
      //   toast({
      //     title: 'Sucesso!',
      //     description: 'Conta devidamente modificada! Por favor, faça seu login novamente.',
      //     status: 'success',
      //     duration: 2000,
      //     isClosable: true,
      //   });
      //   destroyCookie(null, 'auth');
      //   router.push('/');
      // } else {
      //   toast({
      //     title: 'Algo aconteceu!',
      //     description: 'Por favor, ente novamente.',
      //     status: 'error',
      //     duration: 2000,
      //     isClosable: true,
      //   });
      // }
      throw new Error();
    } catch (error: any) {
      {
        toast({
          title: 'Essa funcionalidade está por vir!',
          description: 'Entre mais tarde para ver o resultado.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <section>
      <Modal
          initialFocusRef={updateInitialRef}
          finalFocusRef={updateFinalRef}
          isOpen={isOpen}
          onClose={onClose}
          size='2xl'
          isCentered
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader margin='0 auto' fontSize='4xl'>
            Edite seus Dados
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="update_user">
              <FormLabel>Seu nome:</FormLabel>
              <Input 
                ref={updateInitialRef}
                placeholder='Nome'
                name="name"
                borderColor="gray.300"
                onChange={(e) => handleInputChange(e, setUser)} 
              />
            </FormControl>

            <FormControl mt={4} id="update_user">
                <FormLabel>E-mail:</FormLabel>
                <Input 
                  placeholder='Email' 
                  type='email'
                  name="email"
                  borderColor="gray.300"
                  onChange={(e) => handleInputChange(e, setUser)}
                />
              </FormControl>

            <FormControl mt={4} id="update_user">
                <FormLabel>Senha:</FormLabel>
                <Input 
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
            <FormControl id="update_user">
            <Button colorScheme='teal' mr={3} type="submit" onClick={(e) => handleUpdateUser(e)}>
              Editar Dados
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
    </section>
  )
};
