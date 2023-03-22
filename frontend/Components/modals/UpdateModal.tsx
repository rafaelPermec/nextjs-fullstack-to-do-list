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
  Input 
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
            <FormControl>
              <FormLabel>Seu nome:</FormLabel>
              <Input 
                ref={updateInitialRef}
                placeholder='Nome'
                name="name"
                borderColor="gray.300"
                onChange={(e) => handleInputChange(e, setUser)} 
              />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>E-mail:</FormLabel>
                <Input 
                  placeholder='Email' 
                  type='email'
                  name="email"
                  borderColor="gray.300"
                  onChange={(e) => handleInputChange(e, setUser)}
                />
              </FormControl>

            <FormControl mt={4}>
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
            <Button colorScheme='teal' mr={3}>
              Editar Dados
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
    </section>
  )
};