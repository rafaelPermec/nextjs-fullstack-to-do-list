import React, { useEffect } from 'react'
import { GetContext } from '../Context/Provider';
import { destroyCookie } from 'nookies';
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
  ArrowUpDownIcon,
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

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
      <Menu
        closeOnSelect={false}
        autoSelect={true}
      >
        <MenuButton
          data-cy='menu-button'
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
                data-cy='menu-login'
                icon={<PlusSquareIcon />} 
                onClick={openLoginModal}  
              >
                Login
              </MenuItem>
              <MenuItem 
                data-cy='menu-signin'
                icon={<BellIcon />} 
                onClick={openSigninModal} 
              >
                Cadastre-se
              </MenuItem>
              </> 
            ) : (
              <>
                <MenuItem 
                  data-cy='menu-update'
                  icon={<EditIcon />}             
                  ref={updateFinalRef}
                  onClick={openUpdateModal} 
                >
                  Alterar perfil
                </MenuItem>
                <MenuItem 
                  data-cy='menu-logout'
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
          <MenuItem data-cy='menu-change-color'icon={<MoonIcon />} onClick={toggleColorMode} >
            Alterar cores
          </MenuItem>
          <MenuItem data-cy='menu-fullscreen' icon={<ArrowUpDownIcon />} onClick={handleFullscreen} >
            Tela cheia
          </MenuItem>
          <MenuItem data-cy='menu-about-me' icon={<InfoOutlineIcon />} onClick={redirectToMyPortifolio} >
            Sobre mim
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
