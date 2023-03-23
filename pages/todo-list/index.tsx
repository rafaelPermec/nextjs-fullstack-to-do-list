/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import todoFactory from '@/frontend/Utils/todo.factory';
import { parseCookies, setCookie } from 'nookies';
import { GetContext } from '@/frontend/Context/Provider';
import { patchTodoFetch, todoFetch } from '@/frontend/Services/todo.fetch';
import { DeletePopover, TopMenu, UpdateModal } from '@/frontend/Components';
import { 
  HStack, 
  VStack, 
  Heading, 
  Text, 
  Checkbox, 
  Spacer, 
  IconButton, 
  StackDivider,
  Popover,
  PopoverTrigger,
  Button,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, SmallAddIcon, CheckIcon, AttachmentIcon } from '@chakra-ui/icons';

export default function TodoList() {
  const { router, setLoading, isLoading, setTodoList, todoList } = GetContext();

  const toast = useToast();

  useEffect((): any => {
    const { 'auth': auth } = parseCookies();
    const getUser = JSON.parse(auth)
    const fetchTodo = async () => {
        setLoading(true);
        const { data } = await todoFetch(getUser.id);
        setTodoList(todoFactory(data.todos, getUser.name));
        setLoading(false);
      }
      fetchTodo();
    }, [setLoading, setTodoList, isLoading]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const element  = (document.getElementById(`${e.target.name}`)) as any;
      element.style.textDecoration = 'line-through';
      element.style.color = 'gray';
    } else {
      const element  = (document.getElementById(`${e.target.name}`)) as any;
      element.style.textDecoration = 'none';
      element.style.color = '';
    } 
  };

  const handleTodoObject = (id: number) => {
    const checkedItens = todoList.map((todo: any) => {
      if (id === todo.id) {
        todo.completed = !todo.completed;
      } return todo;
    });
    setTodoList(checkedItens);
    console.log(todoList)
  };

  const clearCompletedTodos = () => {
    const clearTodo = todoList.filter((todo: any) => todo.completed !== true);
    setTodoList(clearTodo);
  };

  const saveChecklist = async () => {
    setCookie(null, 'todoList', JSON.stringify(todoList), { maxAge: 60 * 60 * 24 * 30,  /* 30 days  */});
    const user = JSON.parse(localStorage.getItem('user') as string);
    try {
      const saveFormat = todoList.map((todo: any) => todo.text)
      console.log(saveFormat);
      await patchTodoFetch(user.id, saveFormat)
      toast({
        title: 'Sucesso!',
        description: 'Sua lista de To-Do foi salva com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error)
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
        <Heading
          mb='8'
          fontWeight='semibold'
          size='2xl'
          bgGradient='linear(to-r, teal.500, teal.300, teal.500)'
          bgClip='text'
        >
          Lista de To-Do's
        </Heading>
        <VStack
          divider={<StackDivider />}
          borderColor='gray.500'
          borderWidth='2px'
          p='4'
          borderRadius='lg'
          w='100%'
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
          alignItems='stretch'
        >
          {
            !isLoading ? (
            todoList.map((todo: any) => (
              <HStack key={todo.id}>
                <Checkbox 
                  size='lg' 
                  colorScheme='teal' 
                  borderColor='gray.500'
                  name={`item-${todo.id}`}
                  defaultChecked={false}
                  onChange={(e) => { handleCheck(e); handleTodoObject(todo.id); }}
                  checked={todo.completed}
                />
                <Text id={`item-${todo.id}`}>{todo.text}</Text>
                <Spacer />
                <IconButton
                  aria-label='Editar item de seu Todo'
                  backgroundColor='teal.400'
                  icon={<EditIcon />}
                  isRound={true}
                  onClick={() => router.push('/todo-list/update')}
                />
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
            ))) : (
              <h1>Loading...</h1>
            )
          }
        </VStack>
        <HStack>
          <Button
            aria-label='Adicionar um novo item a sua lista de To-Do'
            colorScheme="teal"
            leftIcon={<SmallAddIcon />}
            onClick={() => router.push('/todo-list/add')}
          >
            Adicionar To-Do
          </Button>
          <Button
            aria-label='Adicionar um novo item a sua lista de To-Do'
            colorScheme="orange"
            variant="outline"
            leftIcon={<CheckIcon />}
            onClick={clearCompletedTodos}
          >
            Limpar tarefas completas
          </Button>
          <Button
            aria-label='Adicionar um novo item a sua lista de To-Do'
            colorScheme="orange"
            variant="outline"
            leftIcon={<AttachmentIcon />}
            onClick={saveChecklist}
          >
            Salvar Lista
          </Button>
        </HStack>
        <UpdateModal />
      </VStack>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const 
  
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
