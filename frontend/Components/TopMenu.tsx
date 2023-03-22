import React from 'react'
import { GetContext } from '../Context/Provider';
import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuDivider, 
  MenuGroup, 
  MenuItem, 
  IconButton,
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  MoonIcon, 
  BellIcon, 
  InfoOutlineIcon, 
  EditIcon, 
  PlusSquareIcon 
} from '@chakra-ui/icons';

export default function TopMenu() {
  const { 
    toggleColorMode, 
    router,
    updateFinalRef,
    onOpen,
    setWhichModal,
  } = GetContext();



  const redirectToMyPortifolio = () => router.push('https://rafaelpermec.github.io/');
  const openLoginModal = () => {
    onOpen();
    setWhichModal('login');
  };
  const openSigninModal = () => {
    onOpen();
    setWhichModal('signin');
  };

  const openUpdateModal = () => {
    onOpen();
    setWhichModal('update');
  };

  return (
      <Menu
        closeOnSelect={false}
        autoSelect={true}
      >
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          mt='2.5'
          ml='3'
          boxShadow="dark-lg"
        />
      <MenuList shadow="dark-lg" >
        <MenuGroup title='Perfil'>
          <MenuItem 
            icon={<PlusSquareIcon />} 
            onClick={openLoginModal}  
          >
            Login
          </MenuItem>
          <MenuItem 
            icon={<BellIcon />} 
            onClick={openSigninModal} 
          >
            Cadastre-se
          </MenuItem>
          <MenuItem 
            icon={<EditIcon />}             
            ref={updateFinalRef}
            onClick={openUpdateModal} 
          >
            Alterar perfil
          </MenuItem>
        </MenuGroup>
        <MenuDivider  />
        <MenuGroup title='Features'>
          <MenuItem icon={<MoonIcon />} onClick={toggleColorMode} >
            Alterar cores
          </MenuItem>
          <MenuItem icon={<InfoOutlineIcon />} onClick={redirectToMyPortifolio} >
            Sobre mim
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
