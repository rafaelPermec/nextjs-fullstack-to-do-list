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

export default function UpdateModal() {
  const { 
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

    try {
      throw new Error();
    } catch (error: any) {
      {
        toast({
          id: 'modal-warning-update',
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
                data-cy='update-input-name'
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
                  data-cy='update-input-email'
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
                  data-cy='update-input-password'
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
            <Button
              data-cy='update-button'
              colorScheme='teal' 
              mr={3} 
              type="submit" 
              onClick={(e) => handleUpdateUser(e)}
            >
              Editar Dados
            </Button>
            </FormControl>
            <Button 
              data-cy='update-button-back'
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
