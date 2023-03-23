/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { GetContext } from '@/frontend/Context/Provider';
import { todoFetch } from '@/frontend/Services/todo.fetch';
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, SmallAddIcon } from '@chakra-ui/icons';

export default function TodoList() {
  const { router, setLoading, isLoading, setTodoList, todoList } = GetContext();

  const getUser = localStorage.getItem('user');
  if (!getUser) {
    router.push('/');
  }
  const parseUser = JSON.parse(getUser as string);

  useEffect((): any => {
    const fetchTodo = async () => {
      
        setLoading(true);
        const { data: { todos } } = await todoFetch(parseUser.id);
        setTodoList(todos);;
        setLoading(false);
        
      }
      fetchTodo();
  }, [setLoading, setTodoList, isLoading, parseUser.id]);

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
            todoList.map((todo: any, index: any) => (
              <HStack key={index}>
                <Checkbox 
                  size='lg' 
                  colorScheme='teal' 
                  borderColor='gray.500'
                  name={`item-${index + 1}`}
                  defaultChecked={false}
                  onChange={(e) => handleCheck(e)}
                />
                <Text id={`item-${index + 1}`}>{todo}</Text>
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
                  <DeletePopover />
                </Popover>
              </HStack>
            ))) : (
              <h1>Loading...</h1>
            )
          }
        </VStack>
        <Button
          aria-label='Adicionar um novo item a sua lista de To-Do'
          colorScheme="teal"
          leftIcon={<SmallAddIcon />}
          onClick={() => router.push('/todo-list/add')}
        >
          Adicionar To-Do
        </Button>
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
    props: {},
  };
}
