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

export default function DeletePopover() {
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
        >
          Excluir
        </Button>
    </PopoverContent>
  )
}
