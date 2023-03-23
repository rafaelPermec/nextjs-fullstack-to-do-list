import React from 'react';
import {  
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton, 
  PopoverHeader, 
  PopoverBody, 
  Button 
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { GetContext } from '@/frontend/Context/Provider';

export default function DeletePopover() {

  const { todoList, setTodoList } = GetContext();

  // const handleTodoDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   try {
  //     await todoDelete(todoId);
  //     const newTodoList = todoList.filter((todo) => todo.id !== todoId);
  //     setTodoList(newTodoList);
  //     setTodoId('');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <PopoverContent boxShadow="dark-lg" >
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Confirme:</PopoverHeader>
      <PopoverBody>Você tem certeza que quer deletar essa tarefa?</PopoverBody>
        <Button
          margin="2"
          colorScheme="red"
          leftIcon={<DeleteIcon />}
          // onClick={(e) => handleTodoDelete(e)}
        >
          Excluir
        </Button>
    </PopoverContent>
  )
}
