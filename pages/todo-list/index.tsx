/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'next/router';
import TopMenu from '@/frontend/Components/TopMenu';
import DeletePopover from '@/frontend/Components/modals/DeletePopover';
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
  const router = useRouter();
  const todos = [
    {
      id: 1,
      body: 'Fazer café',
    },
    {
      id: 2,
      body: 'Estudar Next.js',
    },
    {
      id: 3,
      body: 'Estudar Chakra UI',
    },
  ];

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

  const redirectToAddTodo = () => router.push('/todo-list/add');

  const redirectToUpdateTodo = () => router.push('/todo-list/update');

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
          todos.map((todo, index) => (
            <HStack key={index}>
              <Checkbox 
                size='lg' 
                colorScheme='teal' 
                borderColor='gray.500'
                name={`item-${index + 1}`}
                defaultChecked={false}
                onChange={(e) => handleCheck(e)}
              />
              <Text id={`item-${index + 1}`}>{todo.body}</Text>
              <Spacer />
              <IconButton
                aria-label='Editar item de seu Todo'
                backgroundColor='teal.400'
                icon={<EditIcon />}
                isRound={true}
                onClick={redirectToUpdateTodo}
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
          ))
          }
        </VStack>
        <Button
          aria-label='Adicionar um novo item a sua lista de To-Do'
          colorScheme="teal"
          leftIcon={<SmallAddIcon />}
          onClick={redirectToAddTodo}
        >
          Adicionar To-Do
        </Button>
      </VStack>
    </main>
  )
}
