/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { GetContext } from '@/frontend/Context/Provider';
import { patchTodoFetch, todoFetch } from '@/frontend/Services/todo.fetch';
import { DeletePopover, TopMenu, UpdateModal } from '@/frontend/Components';
import { 
  HStack, 
  VStack, 
  Text, 
  Checkbox, 
  Spacer, 
  IconButton, 
  StackDivider,
  Popover,
  PopoverTrigger,
  Button,
  useToast,
  Stack,
  Skeleton,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, SmallAddIcon, CheckIcon, AttachmentIcon } from '@chakra-ui/icons';


export default function TodoList() {
  const { router, setLoading, isLoading, setTodoList, todoList, megrimFont } = GetContext();

  const toast = useToast();

  
  useEffect((): any => {
    const { 'user': user } = parseCookies();
    const getUser = JSON.parse(user);

    const handleLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    handleLoading();
    
    const fetchTodo = async () => {
      const { data } = await todoFetch(getUser.id);
      const parsedData = JSON.parse(data.tasks);
      setTodoList(parsedData);
    }
    fetchTodo();
   
  }, [setLoading, setTodoList]);


  const handleIsCompleted = (id: number) => {
    const checkedItens = todoList.map((todo: any) => {
      if (id === todo.id) {
        todo.completed = !todo.completed;
      } return todo;
    });
    setTodoList(checkedItens);
  };

  const clearCompletedTodos = () => {
    try {
      const clearTodo = todoList.filter((todo: any) => todo.completed !== true);
      setTodoList(clearTodo);
      toast({
        title: 'Sucesso!',
        description: 'Tarefas concluídas foram removidas!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        });
    } catch (error) {
      toast({
        title: 'Algo aconteceu!',
        description: 'Tente novamente mais tarde!',
        status: 'error',
        duration: 2000,
        isClosable: true,
        });
    }
  };

  const saveChecklist = async () => {
    setCookie(null, 'todoList', JSON.stringify(todoList), { maxAge: 60 * 60 * 24 * 30,  /* 30 days  */});
    const { 'user': user } = parseCookies();
    const getUser = JSON.parse(user);
    try {
      await patchTodoFetch(getUser.id, { tasks: JSON.stringify(todoList) })
      toast({
        title: 'Sucesso!',
        description: 'Sua lista de To-Do foi salva com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Algo aconteceu!',
        description: 'Tente novamente mais tarde!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <main>
      <TopMenu />
      <VStack p={12} gap="5">
      <Text
          className={megrimFont.className}
          fontSize='7xl' 
          noOfLines={2}
          color='teal.500'
          mb={-4}
          mt={-6}
        >
          Lista de Tarefas:
        </Text>
        <VStack
          divider={<StackDivider />}
          borderColor='gray.500'
          borderWidth='2px'
          p='4'
          borderRadius='lg'
          alignItems='stretch'
        >
          { 
            todoList.map((todo: any) => (
              <Skeleton
                isLoaded={!isLoading}
                fadeDuration={4}
                key={todo.id}
              >
                <HStack key={todo.id}>
                    <Checkbox 
                      size='lg' 
                      colorScheme='teal' 
                      borderColor='gray.500'
                      name={`item-${todo.id}`}
                      defaultChecked={false}
                      onChange={() => handleIsCompleted(todo.id)}
                      isChecked={todo.completed}
                    />
                  <Text 
                    id={`item-${todo.id}`}
                    textDecoration={
                      todo.completed ? 'line-through' : 'none'
                    }
                    color={todo.completed ? 'gray.500' : ''}
                    >
                      {todo.text}
                  </Text>
                  <Spacer />
                  <Tooltip hasArrow label="Modifique essa tarefa" fontSize='xs'>
                    <IconButton
                      aria-label='Editar item de seu Todo'
                      backgroundColor='teal.400'
                      icon={<EditIcon />}
                      isRound={true}
                      onClick={() => router.push(`/todo-list/update/${todo.id}`)}
                    />
                  </Tooltip>
                  <Popover>
                      <PopoverTrigger>
                        <IconButton
                          aria-label='Deletar item de seu Todo'
                          backgroundColor='red.300'
                          icon={<DeleteIcon />}
                          isRound={true}
                        />
                      </PopoverTrigger>
                    <DeletePopover taskId={todo.id} />
                  </Popover>
                </HStack>
              </ Skeleton>
            ))
          }
        </VStack>
        <Stack
          direction={['column', 'row']}
        >
          <Tooltip hasArrow label="Crie uma tarefa" fontSize='xs'>
            <Button
              aria-label='Adicionar um novo item a sua lista de To-Do'
              colorScheme="teal"
              leftIcon={<SmallAddIcon />}
              onClick={() => router.push('/todo-list/add')}
            >
              Adicionar To-Do
            </Button>
          </Tooltip>
          <Tooltip hasArrow label="Deletar tarefas concluídas" fontSize='xs'>
            <Button
              aria-label='Adicionar um novo item a sua lista de To-Do'
              colorScheme="teal"
              variant="outline"
              leftIcon={<CheckIcon />}
              onClick={clearCompletedTodos}
            >
              Limpar tarefas completas
            </Button>
          </Tooltip>
          <Tooltip hasArrow label="Registrar lista atual" fontSize='xs'>
            <Button
              aria-label='Adicionar um novo item a sua lista de To-Do'
              colorScheme="teal"
              variant="outline"
              leftIcon={<AttachmentIcon />}
              onClick={saveChecklist}
            >
              Salvar Lista
            </Button>
          </Tooltip>
        </Stack>
        <UpdateModal />
      </VStack>
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
    props: { },
  };
}
