import React from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import { TopMenu } from '@/frontend/Components';
import {
  Flex,
  Heading,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';


export default function AddTodo() {
  const { router } = GetContext();
  return (
    <main>
      <TopMenu />
      <Flex height="80vh" alignItems="center" justifyContent="center" >
        <Flex direction="column" p={12} rounded={6} boxShadow="dark-lg">
          <Heading mb={6}>Adicione uma Tarefa</Heading>
            <Textarea mb={8} placeholder='Ex: Ir ao dentista' required/>
            <Button colorScheme="teal" mb={6} type="submit">Adicionar</Button>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="facebook" 
              mb={6}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
        </Flex>
      </Flex>
    </main>
  )
}
