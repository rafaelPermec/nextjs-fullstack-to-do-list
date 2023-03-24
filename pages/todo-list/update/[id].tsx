import React from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { TopMenu, UpdateModal } from '@/frontend/Components';
import {
  Flex,
  Heading,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { patchTodoFetch } from '@/frontend/Services/todo.fetch';
import { TodoResponseDTO } from '@/frontend/DTOS/todo.frontend.dto';

export default function UpdateTodo() {
  const { router, handleInputChange, todoUpdate, setTodoUpdate, todoList, setTodoList } = GetContext()
  const taskId = router.query.id;
  const toast = useToast()
  
  const handleUpdateTodo = async () => {
    const { 'user': user } = parseCookies();
    const getUser = JSON.parse(user);
    if (todoUpdate.length !== 0) {
      try {
        const updateTodo = todoList.map((todo: TodoResponseDTO) => {
          if (todo.id === taskId) {
            todo.text = todoUpdate.updateTask;
            return todo;
          } 
        });
        // console.log('todoList', todoList)
        // console.log(updateTodo)
        const jsonList = JSON.stringify(todoList);
        setTodoList(todoList);
        setTodoUpdate('');
        await patchTodoFetch(getUser.id, { tasks: jsonList });
        toast({
          title: "Tarefa modificada com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push('/todo-list');
      } catch (error) {
        toast({
          title: "Erro ao modificar tarefa!",
          description: "Tente novamente mais tarde.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro ao modificar tarefa!",
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
        <Heading mb={6}>Modifique uma Tarefa</Heading>
          <Textarea 
            mb={8} placeholder='Ex: Ir ao dentista' 
            name="updateTask"
            onClick={(e) => handleInputChange(e, setTodoUpdate)}
            required
          />
          <Button 
            colorScheme="teal" 
            mb={6} 
            type="submit"
            onClick={handleUpdateTodo}
          >
            Modificar
          </Button>
          <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="facebook" 
              mb={6}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          <UpdateModal/>
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