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

export default function SigninModal() {
  const { isOpen, onClose, signinFinalRef, signinInitialRef } = GetContext()
  
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
            <ModalHeader>Crie sua conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Seu nome:</FormLabel>
                <Input ref={signinInitialRef} placeholder='Nome' borderColor="gray.300"/>
              </FormControl>
  
              <FormControl mt={4}>
                  <FormLabel>E-mail:</FormLabel>
                  <Input placeholder='Email' type='email' borderColor="gray.300"/>
                </FormControl>

              <FormControl mt={4}>
                  <FormLabel>Senha:</FormLabel>
                  <Input placeholder='Senha' type='password' borderColor="gray.300"/>
                </FormControl>
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
      </section>
    )
}
