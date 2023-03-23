import React, { useEffect } from 'react'
import { GetContext } from '../Context/Provider';
import { parseCookies, destroyCookie } from 'nookies';
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
import { GetServerSideProps } from 'next';

export default function TopMenu() {
  const { 
    toggleColorMode, 
    router,
    updateFinalRef,
    onOpen,
    setWhichModal,
    isAuthCookies,
    setIsAuthCookies,
  } = GetContext();

  useEffect(() => {
    const { 'auth': auth } = parseCookies();
    if (auth) {
      setIsAuthCookies(true);
    } else {
      setIsAuthCookies(false);
    }
  }, [setIsAuthCookies, isAuthCookies]);

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
    localStorage.removeItem('user');
    destroyCookie(null, 'auth', { path: '/' })
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
            !isAuthCookies ? (
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
