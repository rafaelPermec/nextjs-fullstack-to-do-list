import React from 'react';
import { GetContext } from '@/frontend/Context/Provider';
import {  
  PopoverContent, 
  PopoverArrow, 
  PopoverCloseButton, 
  PopoverHeader, 
  PopoverBody, 
  Button,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface DeletePopoverProps {
  taskId: string;
}

export default function DeletePopover(props: DeletePopoverProps) {

  const { todoList, setTodoList } = GetContext();
  const toast = useToast();

  const handleTodoDelete = () => {
    try {
      const deleteTodo = todoList.filter((todo: any) => todo.id !== props.taskId);
      setTodoList(deleteTodo);
      toast({
        title: 'Tarefa deletada com sucesso!',
        description: 'Para gravar sua lista, pressione o botão "Salvar Lista".',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao deletar tarefa',
        description: 'Tente novamente mais tarde.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
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
