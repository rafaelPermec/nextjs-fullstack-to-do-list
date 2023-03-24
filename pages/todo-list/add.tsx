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
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import todoFactory from '@/frontend/Utils/todo.factory';
import { patchTodoFetch } from '@/frontend/Services/todo.fetch';


export default function AddTodo() {
  const { router, handleInputChange, todoUpdate, setTodoUpdate, todoList, setTodoList } = GetContext();

  const toast = useToast()

  const handleAddTodo = async () => {
    const { 'user': user } = parseCookies();
    const getUser = JSON.parse(user);
    if (todoUpdate.length !== 0) {
      try {
        const newTodo = todoFactory(todoUpdate.addTask, getUser.id);
        const newList = [...todoList, newTodo];
        const jsonList = JSON.stringify(newList);
        setTodoList(newList);
        await patchTodoFetch(getUser.id, { tasks: jsonList });
        toast({
          title: "Tarefa adicionada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push('/todo-list');
      } catch (error) {
        toast({
          title: "Erro ao adicionar tarefa!",
          description: "Tente novamente mais tarde.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro ao adicionar tarefa!",
        description: "Preencha o campo acima.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
              name="addTask"
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
