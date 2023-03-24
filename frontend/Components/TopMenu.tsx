import React, { useContext, useEffect } from 'react'
import { GetContext } from '../Context/Provider';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthContext } from '../Context/AuthContext';
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
  PlusSquareIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons';

export default function TopMenu() {
  const {
    isAuth,
    setIsAuth,
    toggleColorMode, 
    router,
    updateFinalRef,
    onOpen,
    setWhichModal,
  } = GetContext();

  useEffect(() => {
    if (router.pathname === '/') {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [router, setIsAuth]);


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

  const handleLogout = () => {
    destroyCookie(null, 'auth')
    destroyCookie(null, 'user')
    router.push('/');
  }

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
          {
            !isAuth ? (
              <>
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
              </> 
            ) : (
              <>
                <MenuItem 
                  icon={<EditIcon />}             
                  ref={updateFinalRef}
                  onClick={openUpdateModal} 
                >
                  Alterar perfil
                </MenuItem>
                <MenuItem 
                  icon={<SmallCloseIcon />}
                  onClick={handleLogout} 
                >
                  Logout
                </MenuItem>
            </>
            )
          }
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
