import React from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import {  
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton, 
  PopoverHeader, 
  PopoverBody, 
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface DeletePopoverProps {
  taskId: string;
}

export default function DeletePopover(props: DeletePopoverProps) {

  const { todoList, setTodoList } = GetContext();

  const handleTodoDelete = () => {
    // e.preventDefault();
    try {
      const deleteTodo = todoList.filter((todo: any) => todo.id !== props.taskId);
      setTodoList(deleteTodo);
      localStorage.setItem('todoList', JSON.stringify(deleteTodo));
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={handleTodoDelete}
        >
          Excluir
        </Button>
    </PopoverContent>
  )
}
