import React from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import { TopMenu, UpdateModal } from '@/frontend/Components';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import {
  Flex,
  Heading,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import todoFactory from '@/frontend/Utils/todo.factory';
import { parse } from 'path';


export default function AddTodo() {
  const { router, handleInputChange, todoUpdate, setTodoUpdate, todoList, setTodoList } = GetContext();

  const handleAddTodo = async () => {
    // const { 'auth': auth } = parseCookies();
    // const getUser = JSON.parse(auth);
    // const newTodo = todoList.push(todoFactory(todoUpdate, getUser.name));
    // setTodoList(newTodo);
    // setTodoUpdate('');
    
    router.push('/todo-list');
  };

  return (
    <main>
      <TopMenu />
      <Flex height="80vh" alignItems="center" justifyContent="center" >
        <Flex direction="column" p={12} rounded={6} boxShadow="dark-lg">
          <Heading mb={6}>Adicione uma Tarefa</Heading>
            <Textarea 
              mb={8} 
              placeholder='Ex: Ir ao dentista' 
              onChange={(e) => handleInputChange(e, setTodoUpdate)} 
              required
            />
            <Button 
              colorScheme="teal" 
              mb={6} 
              type="submit"
              onClick={handleAddTodo}
            >
              Adicionar
            </Button>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="facebook" 
              mb={6}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <UpdateModal />
        </Flex>
      </Flex>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth': auth } = parseCookies(ctx);
  
  if (!auth) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
