import React from 'react'
import { Menu, MenuButton, MenuList, MenuDivider, MenuGroup, MenuItem, IconButton, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, BellIcon, InfoOutlineIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import  { useRouter } from 'next/router';

export default function TopMenu() {
  const { toggleColorMode } = useColorMode();
  const router = useRouter();
  const redirectToMyPortifolio = () => router.push('https://rafaelpermec.github.io/');
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
          <MenuItem icon={<PlusSquareIcon />} onClick={toggleColorMode} >
            Login
          </MenuItem>
          <MenuItem icon={<BellIcon />} onClick={toggleColorMode} >
            Cadastre-se
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={toggleColorMode} >
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
