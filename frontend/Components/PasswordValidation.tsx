import React from 'react'
import { GetContext } from '../Context/Provider';
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { WarningIcon, CheckCircleIcon } from '@chakra-ui/icons';

export default function PasswordValidation() {
  const { restrictionList } = GetContext();

  return (
    <List spacing={1} fontSize="12" mt="15" ml="30">
      <ListItem>
        Sua Senha deve conter:
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.minLength ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.minLength ?
          'green.500' :
          'yellow.500'
        }
        />
        O minimo de 8 caracteres.
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.lowerCase ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.lowerCase ?
          'green.500' :
          'yellow.500'
        }
        />
        Pelo menos uma letra maiuscula.
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.upperCase ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.upperCase ?
          'green.500' :
          'yellow.500'
        }
        />
        Pelo menos uma letra minuscula.
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.number ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.number ?
          'green.500' :
          'yellow.500'
        }
        />
        Pelo menos um numero.
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.specialChar ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.specialChar ?
          'green.500' :
          'yellow.500'
        }
        />
        Pelo menos um caracter especial.
      </ListItem>
      <ListItem 
      color={
        restrictionList.minLength && 'green.500'
      }
      >
        <ListIcon 
        as={ 
          restrictionList.maxLength ? 
          CheckCircleIcon:
          WarningIcon
        } 
        color={
          restrictionList.maxLength ?
          'green.500' :
          'yellow.500'
        }
        />
        Máximo de 30 caracteres.
      </ListItem>
    </List>
  )
}
